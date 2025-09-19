import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Input } from "../Input";
import { Loader } from "../Loader";
import { AuthLayout } from "./AuthLayout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const PasswordRecoveryForm = () => {
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

  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const emailSchema = z.string().email({ message: "Invalid email format!" });
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
              navigate("/auth/signin");
            }}
            className="text-indigo-400 cursor-pointer hover:text-indigo-500 absolute top-1 left-0"
          />
          <p className="text-center text-white text-[20px] mb-4">
            Reset your password
          </p>
          <p className="text-center text-white text-[14px] mb-4">
            Enter your user account's verified email address and we will send
            you a password reset link.
          </p>
          <form
            className="flex flex-col space-y-4 mb-4"
            onSubmit={handleRecoveryAccount}
          >
            <label className="text-white font-semibold text-[14px] mb-3">
              Email
            </label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={email}
                placeholder="user@adress.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
            </div>

            <p className="text-red-500">{showError && error}</p>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-blue w-full p-2 rounded-[8px] text-white text-[14px] cursor-pointer"
                type="submit"
              >
                {!loading ? "Send password reset email" : <Loader />}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};
