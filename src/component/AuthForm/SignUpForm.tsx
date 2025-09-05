import { Input } from "../Input";
import { useEffect, useState } from "react";
import z from "zod";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { Loader } from "@/component/Loader";
import { AuthLayout } from "./AuthLayout";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PasswordRecommendation } from "./PasswordRecommendation";
import { useAuth } from "@/hooks/use-auth";

type FormData = z.infer<typeof formDataScheme>;

const initialFormData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  isChecked: false,
};

const formDataScheme = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(4)
      .regex(/[a-z]/, "Username must contain a lowercase letter"),
    password: z
      .string()
      .min(6)
      .max(32)
      .regex(/[A-Z]/, "Password must contain a capital letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a digit"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password !== data.username, {
    message: "Username and password must not match",
    path: ["password"],
  });

export const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [passwordRecommendation, setPasswordRecommendation] =
    useState<boolean>(false);
  const formData = {
    ...initialFormData,
    ...userFormData,
  };

  const validate = () => {
    const res = formDataScheme.safeParse(userFormData);
    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validate();

    if (errors) {
      setShowErrors(true);

      return;
    } else {
      const { isChecked, ...data } = formData;
      try {
        setLoading(true);
        const res = await axios.post(API_ENDPOINTS.signup, data, {
          withCredentials: true,
        });
        console.log(res);
        if (!res) {
          setLoading(false);
          return;
        }
        if (res.data) {
          setLoading(false);
          toast.success(res.data);
        }
      } catch (e: unknown) {
        console.log(e);
        if (e instanceof AxiosError) {
          console.log("catch");
          console.log(e.response?.data?.message[0]);

          toast(e.response?.data?.message[0] + " already exists!");
          setLoading(false);
        }
      }
    }
  };

  const errors = showErrors ? validate() : undefined;
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
              navigate(-1);
            }}
            className="text-blue hover:text-blue-active cursor-pointer absolute size-6.5 top-1 left-0"
          />
          <p className="text-center text-white text-2xl mb-8">
            Sign Up to SteamRep
          </p>

          <form
            className="flex flex-col space-y-4 mb-4"
            onSubmit={handleSignUp}
          >
            <div className="flex justify-between mb-3">
              <label className="text-white font-semibold text-[14px]">
                Email
              </label>
              <label className="text-red-500 text-[12px]">
                {errors?.email?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={formData.email}
                placeholder="user@adress.com"
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    email: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white font-semibold text-[14px]">
                Username
              </label>
              <label className="text-red-500 text-[12px]">
                {errors?.username?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={formData.username}
                placeholder="user"
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    username: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white font-semibold text-[14px]">
                Password
              </label>
              <label className="text-red-500 text-[12px]">
                {errors?.password?._errors[0]}
              </label>
            </div>

            <div className="flex flex-col items-center w-full relative">
              <div className="absolute text-gray-text cursor-pointer top-2.5 right-2.5 z-15 hover:text-gray-hover">
                <Info
                  size={18}
                  onMouseEnter={() => setPasswordRecommendation(true)}
                  onMouseLeave={() => setPasswordRecommendation(false)}
                />
              </div>
              <Input
                variant="forAuth"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    password: e.target.value,
                  }))
                }
              ></Input>
              <div className="relative w-full">
                <div
                  className={cn(
                    passwordRecommendation
                      ? "absolute bg-light-gray outline-1 p-3.5 rounded-2xl text-white top-2 right-0"
                      : "hidden"
                  )}
                >
                  <PasswordRecommendation />
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-3">
              <label className="text-white font-semibold text-[14px]">
                Confirm Password
              </label>
              <label className="text-red-500 text-[12px]">
                {errors?.confirmPassword?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={formData.confirmPassword}
                placeholder="••••••••"
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    confirmPassword: e.target.value,
                  }))
                }
              ></Input>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={formData.isChecked}
                  onChange={(e) =>
                    setUserFormData((l) => ({
                      ...l,
                      isChecked: e.target.checked,
                    }))
                  }
                ></input>
                <p className="text-[14px] text-white">I'm not a robot</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-blue w-full p-2 rounded-[8px]  text-white text-[14px] cursor-pointer"
                type="submit"
                disabled={!!errors || initialFormData.isChecked}
              >
                {!loading ? "Sign In" : <Loader />}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};
