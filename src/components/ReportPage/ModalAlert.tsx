import { IAuth } from "@/models/IAuth";
import { X } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Container } from "../container";
import { steamVerification } from "@/lib/steamVerification";

interface Props {
  setModal: (value: boolean) => void;
  auth: IAuth;
}

const ModalAlert = ({ setModal, auth }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-full flex justify-center z-999">
      <Container>
        <div className="bg-secondary/50 rounded-xl h-[230px] sm:h-[200px] w-full outline-1 outline-light-gray">
          <div className="w-full flex justify-between border-b-2 p-4 text-white border-gray mb-4">
            <p className="md:text-2xl">Welcome to CS2 Overwatch</p>
            <button className="cursor-pointer">
              <X onClick={() => setModal(false)} size={24} />
            </button>
          </div>
          <div className="flex text-left pl-4 sm:mb-8 mb-4">
            <p className="text-white md:text-xl">
              {!auth.isAuth
                ? "To access all the features of our site, please log in to your account"
                : auth.role === "ACTIVE"
                ? "To send reports on other players or view clips, you must link your Steam account using the button below"
                : "Welcome"}
            </p>
          </div>
          {auth.role !== "VERIFIED" && (
            <div className="flex text-white pl-4">
              <button
                onClick={() => {
                  !auth.isAuth ? navigate("/auth/signin") : steamVerification();
                }}
                className="px-8 py-0.5 border-1 border-light-gray-3 rounded-full bg-blue cursor-pointer"
              >
                <p className="text-white text-xl">
                  {!auth.isAuth
                    ? "Login"
                    : auth.role === "ACTIVE" && "Connect Steam"}
                </p>
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ModalAlert;
