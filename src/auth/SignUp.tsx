import { Input } from "../component/Input";
import { Header } from "../views/Header";

export const SignUp = () => {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-gray-800">
        <p className="text-center">Sign up</p>
        <p className="text-center">
          Please fill in this form to create an account!
        </p>
        <div className="flex flex-col items-center space-y-2">
          <Input variant="forAuth" placeholder="Enter email"></Input>
          <Input variant="forAuth" placeholder="Enter username"></Input>
          <Input variant="forAuth" placeholder="Enter password"></Input>
          <Input variant="forAuth" placeholder="Repeat password"></Input>
        </div>
        <div>
          <p>Sign Up</p>
          <p></p>
        </div>
      </div>
    </>
  );
};
