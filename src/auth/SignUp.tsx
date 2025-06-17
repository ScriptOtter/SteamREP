import { Input } from "../component/Input";
import { Header } from "../views/Header";
import { useState } from "react";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/UserSlice";
import { Loader2, X } from "lucide-react";
import { Loader } from "@/component/Loader";

export const SignUp = () => {
  const [modalVerify, setModalVerify] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      username: z.string().min(4),
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

  const handleCodeVerification = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.get(API_ENDPOINTS.emailVerify + code, {
        withCredentials: true,
      });

      if (!res) {
        setCode("");
        return;
      }
      setCode("");
      setModalVerify(false);
      navigate("/profile/createProfile");
      toast.success("Your account has been activated!");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }
    }
  };
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validate();

    if (errors) {
      setShowErrors(true);
      //console.log(errors);
      return;
    } else {
      const { isChecked, ...data } = formData;
      try {
        setLoading(true);
        const res = await axios.post(API_ENDPOINTS.signup, data, {
          withCredentials: true,
        });
        if (!res) {
          return;
        }
        if (!res.data.steamUser) {
          setLoading(false);
          dispatch(setUser(res.data));
          setModalVerify(true);
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          console.log("catch");
          console.log(e.response?.data.target[0]);
          toast(e.response?.data.target[0] + " already exists!");
          setLoading(false);
        }
      }
    }
  };

  const errors = showErrors ? validate() : undefined;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center absolute ">
        {modalVerify ? (
          <div className="absolute w-[410px] h-[260px] bg-gray-800 rounded-xl outline-1 mb-6 backdrop-blur-3xl">
            <X
              onClick={() => setModalVerify(false)}
              size={16}
              className="absolute top-1.5 right-2.5 text-white cursor-pointer"
            />
            <div className="justify-center items-center my-4 text-white ">
              <div className="text-center mb-3">
                <label className="text-2xl font-bold">
                  SteamRep - Account Verification
                </label>
              </div>
              <div className="mb-3 mx-3">
                <label className="mr-1">
                  A letter with a code has been sent to your email{" "}
                </label>{" "}
                <label className="underline underline-offset-2">
                  {formData.email}
                </label>
                <label>.</label>
                <p className="mt-3">
                  Please enter the code to activate your account.
                </p>
              </div>
              <div className="mx-3 mb-5.5">
                <Input
                  variant="forAuth"
                  value={code}
                  maxLength={6}
                  placeholder="XXXXXX"
                  onChange={(e) => setCode(e.target.value)}
                ></Input>
              </div>
              <div className="mx-2.5">
                <button
                  className="bg-indigo-600 w-full p-1.5 rounded-[8px] text-white text-[14px] cursor-pointer"
                  onClick={handleCodeVerification}
                >
                  Activate Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[400px]">
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
                <label className="text-white text-[14px]">
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
        )}
      </div>
    </>
  );
};
