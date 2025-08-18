import { Input } from "../component/Input";
import { Header } from "../views/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { setUser } from "@/store/UserSlice";
import { Loader } from "@/component/Loader";
import { toast } from "react-toastify";
import { z } from "zod";

export const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgotPassword, setForgotPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const emailSchema = z.string().email({ message: "Invalid email format!" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRecoveryAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    const parseEmail = emailSchema.safeParse(email);

    if (parseEmail.success) {
      setShowError(false);
      setError("");
      setLoading(true);
      const data = { email: email };
      try {
        const res = await axios.patch(API_ENDPOINTS.recoveryPassword, data, {
          withCredentials: true,
        });
        if (res.data) {
          toast.success(
            "An account recovery email has been sent to your email address."
          );
          setLoading(false);
        }
        console.log(res.data);
      } catch (e: unknown) {
        console.log(e);
        if (e instanceof AxiosError) {
          toast.error(e?.response?.data?.message);
        }
        setLoading(false);
      }
    }
  };

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

  return (
    <>
      <Header />

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-[400px]">
          {!isForgotPassword ? (
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

                  <p
                    onClick={() => setForgotPassword(true)}
                    className="text-[14px] cursor-pointer text-indigo-500 hover:text-indigo-600 hover:underline hover:underline-2"
                  >
                    Forgot password?
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
                  <p className="text-white text-[14px]">Not a member?</p>
                  <p className="text-indigo-500 text-[14px]">
                    <Link to="/auth/signup">Log Up</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-white text-[20px] mb-2">
                Reset your password
              </p>
              <p className="text-center text-white text-[14px] mb-8">
                Enter your user account's verified email address and we will
                send you a password reset link.
              </p>
              <form
                className="flex flex-col space-y-4 mb-8"
                onSubmit={handleRecoveryAccount}
              >
                <label className="text-white text-[14px] mb-3">Email</label>
                <div className="flex flex-col items-center w-full">
                  <Input
                    variant="forAuth"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center"></div>
                </div>
                <p className="text-red-500">{showError && error}</p>
                <div className="flex justify-center items-center w-full">
                  <button
                    className="bg-indigo-600 w-1/1 p-1.5 rounded-[8px] text-white text-[14px] cursor-pointer"
                    type="submit"
                  >
                    {!loading ? "Send password reset email" : <Loader />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
