import { Input } from "../component/Input";
import { Header } from "../views/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/UserSlice";

export const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShorwError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      console.log("pusto");
    } else {
      const data = { username: username, password: password };
      dispatch(loginUser(data))
        .then((result) => {
          console.log(result);
          if (result.payload) {
            setUsername("");
            setPassword("");
            navigate("/profile/me");
          } else {
            if (result.error.code === "ERR_BAD_REQUEST") {
              setPassword("");
              setError("Wrong username or password!");
              setShorwError(true);
            }
          }
        })
        .catch((e) => {
          //setError(e);
          console.log(e);
          setShorwError(true);
        });
    }
  };

  return (
    <>
      <Header />

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-[400px]">
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

              <p className="text-[14px] text-indigo-500">Forgot password?</p>
            </div>
            <p className="text-red-500">{showError && error}</p>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-indigo-600 w-1/1 p-1.5 rounded-[8px] text-white text-[14px]"
                type="submit"
              >
                Sign In
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
      </div>
    </>
  );
};
