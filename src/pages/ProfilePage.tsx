import { useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { API_AVATAR } from "../services/apiAvatar.ts";

import { SteamId } from "../services/steam.tsx";
interface ProfileParams {
  id: string;
}

export const ProfilePage = () => {
  const { id } = useParams<ProfileParams>();
  const API_AVATAR_URL = API_AVATAR();

  // const res = SteamId();
  // console.log(res);

  return (
    <>
      <Header />

      <div className="w-full h-screen pt-8 bg-gray-900 flex justify-center">
        <div className="container max-w-[1280px]">
          <div className="flex ">
            <div className="ml-2 lg:w-[320px] w-[256px]">
              <div className="flex justify-center items-center">
                <img
                  src={API_AVATAR_URL}
                  className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-gray-500"
                />
              </div>
              <div className="ml-7 mt-2">
                <p className="text-2xl text-bold text-white">Nickname {id}</p>
                <p className="text-s text-bold text-white">TG {id}</p>
                <p className="text-s text-bold text-white">Youtube {id}</p>
              </div>

              <div className="flex justify-center">
                <button className="bg-gray-500 w-[90%] rounded p-1 mt-2 outline-1 outline-gray-300 cursor-pointer">
                  <p className="text-bold text-white">Edit Profile</p>
                </button>
              </div>
            </div>
            <div className="bg-blue-200 flex-4/5 lg:flex-3/4">
              <div className="flex space-x-2">
                <p>Основная информация</p>
                <p>отзывы</p>
                <p>отзывы</p>
                <p>отзывы</p>
                <p>отзывы</p>
              </div>
              <p>
                Когда зареган акк, основная инфа, сколько игр,SteamID Запреты и
                ограничения трейд ссылка Формула для рейтинга аккаунта, доверие
                к челу
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
