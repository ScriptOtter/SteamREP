import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/store/UserSlice";
import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { Input } from "../Input";
import { Loader } from "../Loader";
import { AuthWraper } from "./AuthWraper";

export const SignInForm = () => {
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username && password) {
      setShowError(false);
      setError("");
      setLoading(true);
      const data = { username: username, password: password };
      try {
        const res = await axios.post(API_ENDPOINTS.signin, data, {
          withCredentials: true,
        });
        console.log(res.data);

        if (!res.data.steamUser) {
          setLoading(false);
          console.log(res.data);
          dispatch(setUser(res.data));
          setUsername("");
          setPassword("");
          navigate("/");
        } else {
          dispatch(setUser(res.data));
          navigate("/");
          return;
        }
      } catch (e: unknown) {
        setLoading(false);
        if (e instanceof AxiosError) {
          console.log(e.response?.data.message);
          setShowError(true);
          setError(e.response?.data.message);
        }
        console.log(e);
      }
    }
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <AuthWraper>
        <div>
          <p className="text-center text-white text-2xl mb-8">
            Sign in to your account
          </p>
          <form
            className="flex flex-col space-y-4 mb-8"
            onSubmit={handleSignIn}
          >
            <label className="text-white text-[14px] mb-3">Username</label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></Input>
            </div>

            <label className="text-white text-[14px] mb-3">Password</label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  className="mr-3"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                ></Input>
                <p className="text-[14px] text-white">Remember me</p>
              </div>

              <p className="text-[14px] cursor-pointer text-indigo-500 hover:text-indigo-600 hover:underline hover:underline-2">
                <Link to="/auth/recovery">Forgot password?</Link>
              </p>
            </div>
            <p className="text-red-500">{showError && error}</p>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-indigo-600 w-1/1 p-1.5 rounded-[8px] text-white text-[14px] cursor-pointer"
                type="submit"
              >
                {!loading ? "Sign In" : <Loader />}
              </button>
            </div>
          </form>
          <div>
            <div className="flex justify-center space-x-2 ">
              <p className="text-white cursor-pointer text-[14px]">
                Not a member?
              </p>
              <p className="text-indigo-500 text-[14px]">
                <Link to="/auth/signup">Log Up</Link>
              </p>
            </div>
          </div>
        </div>
      </AuthWraper>
    </>
  );
};
