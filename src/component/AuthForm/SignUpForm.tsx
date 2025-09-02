import { Input } from "../Input";
import { useState } from "react";
import z from "zod";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { Loader } from "@/component/Loader";
import { AuthWraper } from "./AuthWraper";

type FormData = z.infer<typeof formDataScheme>;

const initialFormData = {
  email: "user@gmail.com",
  username: "user",
  password: "passwordA1",
  confirmPassword: "passwordA1",
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

  return (
    <>
      <AuthWraper>
        <div>
          <p className="text-center text-white text-2xl mb-8">
            Sign Up to SteamRep
          </p>
          <form
            className="flex flex-col space-y-4 mb-8"
            onSubmit={handleSignUp}
          >
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">Email</label>
              <label className="text-red-500 text-[12px]">
                {errors?.email?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={formData.email}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    email: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">Username</label>
              <label className="text-red-500 text-[12px]">
                {errors?.username?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={formData.username}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    username: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">Password</label>
              <label className="text-red-500 text-[12px]">
                {errors?.password?._errors[0]}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    password: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">Confirm Password</label>
              <label className="text-red-500 text-[12px]">
                {errors?.confirmPassword?._errors}
              </label>
            </div>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={formData.confirmPassword}
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
                className="bg-indigo-600 w-full p-1.5 rounded-[8px] text-white text-[14px] cursor-pointer"
                type="submit"
                disabled={!!errors || initialFormData.isChecked}
              >
                {!loading ? "Sign In" : <Loader />}
              </button>
            </div>
          </form>
        </div>
      </AuthWraper>
    </>
  );
};
