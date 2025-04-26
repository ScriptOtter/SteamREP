import { Input } from "../component/Input";
import { Header } from "../views/Header";

export const SignIn = () => {
  return (
    <>
      <Header />

      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-[400px]">
          <p className="text-center text-white text-2xl mb-8">
            Sign in to your account
          </p>
          <form className="flex flex-col space-y-4 mb-8">
            <label className="text-white text-[14px] mb-3">Username</label>
            <div className="flex flex-col items-center w-full">
              <Input variant="forAuth"></Input>
            </div>

            <p className="text-white text-[14px] mb-3">Password</p>
            <div className="flex flex-col items-center w-full">
              <Input variant="forAuth"></Input>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3"></input>
                <p className="text-[14px] text-white">Remember me</p>
              </div>

              <p className="text-[14px] text-indigo-500">Forgot password?</p>
            </div>
            <div className="flex justify-center items-center w-full">
              <button className="bg-indigo-600 w-1/1 p-1.5 rounded-[8px] text-white text-[14px]">
                Sign In
              </button>
            </div>
          </form>
          <div>
            <div className="flex justify-center space-x-2 ">
              <p className="text-white text-[14px]">Not a member?</p>
              <p className="text-indigo-500 text-[14px]">Log Up</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
