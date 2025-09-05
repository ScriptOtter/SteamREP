import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/store/UserSlice";
import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { Input } from "../Input";
import { Loader } from "../Loader";
import { AuthLayout } from "./AuthLayout";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

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

  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <>
      <AuthLayout>
        <div className="relative">
          <ArrowLeft
            onClick={() => {
              navigate("/");
            }}
            className="text-blue hover:text-blue-active cursor-pointer absolute size-6.5 top-1 left-0"
          />
          <p className="text-center text-white text-2xl mb-8">
            Sign in to your account
          </p>
          <form
            className="flex flex-col space-y-4 mb-8"
            onSubmit={handleSignIn}
          >
            <label className="text-white font-semibold text-[14px] mb-3">
              Username
            </label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={username}
                placeholder="user"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></Input>
            </div>

            <label className="text-white text-[14px] font-semibold mb-3">
              Password
            </label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                placeholder="••••••••"
                className="placeholder:text-xs"
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

              <p className="text-blue hover:text-blue-active text-[14px] cursor-pointer hover:underline hover:underline-2">
                <Link to="/auth/recovery">Forgot password?</Link>
              </p>
            </div>
            <p className="text-red-500">{showError && error}</p>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-blue w-full p-2 rounded-[8px] text-white text-[14px] cursor-pointer"
                type="submit"
              >
                {!loading ? "Sign In" : <Loader />}
              </button>
            </div>
          </form>
          <div>
            <div className="flex justify-center space-x-2 ">
              <p className="text-white text-[14px]">Not a member?</p>
              <p className="text-blue hover:text-blue-active text-[14px] cursor-pointer hover:underline hover:underline-2">
                <Link to="/auth/signup">Log Up</Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
