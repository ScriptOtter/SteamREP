import { Container } from "@/component/container";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/views/Header";
import { InfoIcon, X } from "lucide-react";

export const TrackingUsersPage = () => {
  const auth = useAuth();
  return (
    <>
      <Header />
      <div className="flex justify-center text-white">
        <Container>
          <h1 className="text-3xl text-center mb-4">Tracking Users</h1>
          <div className="flex w-full space-x-[5%] px-8">
            <div className="w-[50%] rounded-xl outline-2 outline-green-400">
              <div className="grid grid-cols-3 text-center text-md w-full outline-1 outline-light-gray rounded-t-xl py-2">
                <p>Tracking Date</p>
                <div className="flex justify-center items-center space-x-1">
                  <p>Player</p>
                  <InfoIcon size={18} />
                </div>
              </div>
              <div className="grid grid-cols-3 text-center items-center text-md w-full bg-light-gray rounded-xl py-1 px-2">
                <p>
                  <p>14 Dec</p>
                </p>
                <div className="flex justify-center items-center space-x-2">
                  {auth.avatar && (
                    <img className="size-8 rounded-xl" src={auth.avatar} />
                  )}
                  <p>{auth.username}</p>
                </div>
                <div className="flex justify-end px-2">
                  <button>
                    <X className="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[50%] rounded-xl outline-1 outline-red-300">
              <div className="grid grid-cols-3 text-center text-xl w-full bg-light-gray rounded-2xl py-3 px-2 mb-2">
                <div>Tracking Date</div>
                <div>Player</div>

                <div>Date Banned</div>
              </div>
              <div className="grid grid-cols-3 text-center items-center text-md w-full bg-light-gray rounded-2xl py-2 px-2">
                <div>{auth.id}</div>
                <div className="flex justify-center items-center space-x-2">
                  {auth.avatar && (
                    <img className="size-8 rounded-xl" src={auth.avatar} />
                  )}
                  <p>{auth.username}</p>
                </div>

                <div>CS2 Ban</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
