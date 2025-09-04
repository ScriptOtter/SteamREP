import { Input } from "../component/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { Loader } from "@/component/Loader";
import { RouteParams } from "./ProfilePage";
import { toast } from "react-toastify";
import { z } from "zod";
import { AuthLayout } from "@/component/AuthForm/AuthLayout";
import { cn } from "@/lib/utils";
import { PasswordRecommendation } from "@/component/AuthForm/PasswordRecommendation";
import { Info } from "lucide-react";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "The minimum length of a password is 8 characters.",
      })
      .max(32, {
        message: "The maximum length of a password is 32 characters.",
      })
      .regex(/[A-Z]/, { message: "Password must contain a capital letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a digit" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "The minimum length of a password is 8 characters.",
      })
      .max(32, {
        message: "The maximum length of a password is 32 characters.",
      })
      .regex(/[A-Z]/, { message: "Password must contain a capital letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a digit" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof passwordSchema>;

export const AccountRecoveryPage = () => {
  const initialFormData = {
    password: "",
    confirmPassword: "",
  };
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [error, setError] = useState<any>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordRecommendation, setPasswordRecommendation] =
    useState<boolean>(false);
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const formData = {
    ...initialFormData,
    ...userFormData,
  };

  const validate = () => {
    const res = passwordSchema.safeParse(formData);
    if (res.success) {
      return undefined;
    }
    console.log(res);
    return res.error.format();
  };

  const handleAccountRecovery = async () => {
    event?.preventDefault();

    const error = validate();

    if (!error) {
      setShowError(false);
      setError("");
      setLoading(true);
      const data = {
        ...formData,
        token: id,
      };
      console.log(data);
      try {
        const res = await axios.patch(API_ENDPOINTS.accountRecovery, data, {
          withCredentials: true,
        });
        console.log(res);
        if (res) {
          toast.success(
            "The password has been successfully changed. You can log in to your account with the new password."
          );
          setLoading(false);
          setUserFormData({});
          navigate("/auth/signin");
        }
      } catch (e: unknown) {
        setLoading(false);
        if (e instanceof AxiosError) {
          console.log(e.response?.data.message);
          setShowError(true);
          setError(
            Array.isArray(e.response?.data.message)
              ? e.response?.data?.message[0]
              : e.response?.data.message
          );
        }
        setLoading(false);
        console.log(e);
      }
    } else {
      setError(errors);
      setShowError(true);
    }
  };
  const errors = showError ? validate() : undefined;
  console.log(errors);
  return (
    <>
      <AuthLayout>
        <p className="text-center text-white text-2xl mb-4">
          Password Recovery
        </p>
        <p className="text-center text-white text-[14px] mb-6">
          Once you change your password, you will be able to log in to your
          account using the new password.
        </p>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleAccountRecovery}
        >
          <label className="text-white font-semibold text-[14px] mb-3">
            Password
          </label>
          <div className="flex flex-col items-center w-full relative">
            <div className="absolute text-gray-text cursor-pointer top-2.5 right-2.5 z-15 hover:text-gray-hover">
              <Info
                size={18}
                onMouseEnter={() => setPasswordRecommendation(true)}
                onMouseLeave={() => setPasswordRecommendation(false)}
              />
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              variant="forAuth"
              value={userFormData.password}
              onChange={(e) => {
                setUserFormData((l) => ({ ...l, password: e.target.value }));
              }}
            ></Input>
            <div className="relative w-full">
              <div
                className={cn(
                  passwordRecommendation
                    ? " absolute bg-light-gray p-3.5 outline-1 rounded-2xl text-white top-2 right-0"
                    : "hidden"
                )}
              >
                <PasswordRecommendation />
              </div>
            </div>
          </div>

          <p className="text-red-500">
            {showError && errors?.password && errors.password._errors[0]}
          </p>
          <label className="text-white font-semibold text-[14px] mb-3">
            Confirm Password
          </label>
          <div className="flex flex-col items-center w-full">
            <Input
              type="password"
              placeholder="••••••••"
              variant="forAuth"
              value={userFormData.confirmPassword}
              onChange={(e) => {
                setUserFormData((l) => ({
                  ...l,
                  confirmPassword: e.target.value,
                }));
              }}
            ></Input>
          </div>
          <p className="text-red-500">
            {showError &&
              errors?.confirmPassword &&
              errors.confirmPassword._errors[0]}
          </p>
          <div className="flex justify-center items-center w-full">
            <button
              className="bg-blue w-full p-2 rounded-[8px]  text-white text-[14px] cursor-pointer"
              type="submit"
            >
              {!loading ? "Change Password" : <Loader />}
            </button>
          </div>
          <p className="text-red-500">{showError && error}</p>
        </form>
      </AuthLayout>
    </>
  );
};
