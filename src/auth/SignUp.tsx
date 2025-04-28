import { Input } from "../component/Input";
import { Header } from "../views/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("mail").required("Must be"),
    username: Yup.string().min(3, "nado 2"),
  });
  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(Yup.string().email("mail").required("Must"));
    console.log(email, username, password, confirmPassword, isChecked);
  };
  return (
    <>
      <Header />

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-[400px]">
          <p className="text-center text-white text-2xl mb-8">
            Sign Up to SteamRep
          </p>
          <form
            className="flex flex-col space-y-4 mb-8"
            onSubmit={handleSignUp}
          >
            <label className="text-white text-[14px] mb-3">Email</label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>

            <label className="text-white text-[14px] mb-3">Username</label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            </div>

            <label className="text-white text-[14px] mb-3">Password</label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </div>

            <label className="text-white text-[14px] mb-3">
              Confirm Password
            </label>
            <div className="flex flex-col items-center w-full">
              <Input
                variant="forAuth"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Input>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                ></input>
                <p className="text-[14px] text-white">I'm not a robot</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-indigo-600 w-1/1 p-1.5 rounded-[8px] text-white text-[14px]"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </>
  );
};
