import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Input } from "../Input";
import { Loader } from "../Loader";
import { AuthWraper } from "./AuthWraper";

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

  return (
    <>
      <AuthWraper>
        <div>
          <p className="text-center text-white text-[20px] mb-2">
            Reset your password
          </p>
          <p className="text-center text-white text-[14px] mb-8">
            Enter your user account's verified email address and we will send
            you a password reset link.
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
      </AuthWraper>
    </>
  );
};
