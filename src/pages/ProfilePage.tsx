import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { useEffect, useState } from "react";
import { getMe, getSteamUser } from "../data/getUser.ts";
import { ISteamUser } from "../models/ISteamUser.ts";
import { Comment } from "../component/Comment.tsx";

interface ProfileParams {
  id: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const { id } = useParams<ProfileParams>();

  const [user, setUser] = useState<ISteamUser>();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "me") {
          const res = await getSteamUser(id);
          setUser(res);
          setLoading(false);
          return;
        }
        const res = getMe();
        if (!res) {
          navigate("/");
        }
        setUser(res);
        setLoading(false);
        return;
      } catch (e) {
        setError(e);
        setLoading(false);
        console.log(e);
      }
    };
    fetchData(id);
  }, []);

  if (!loading)
    return (
      <>
        <Header />

        <div className="w-full h-screen pt-8 bg-gray-900 flex justify-center">
          <div className="container max-w-[1280px]">
            <div className="flex ">
              <div className="ml-2 lg:w-[320px] w-[256px]">
                <div className="flex justify-center items-center">
                  <img
                    src={user?.avatar || ""}
                    className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-gray-500"
                  />
                </div>
                <div className="ml-7 mt-2">
                  <p className="text-2xl text-bold text-white">
                    {user?.realname || "asdas"}
                  </p>
                  <p className="text-s text-bold text-white">TG </p>
                  <p className="text-s text-bold text-white">Youtube</p>
                </div>

                <div className="flex justify-center">
                  <button className="bg-gray-500 w-[90%] rounded p-1 mt-2 outline-1 outline-gray-300 cursor-pointer">
                    <p className="text-bold text-white">Edit Profile</p>
                  </button>
                </div>
              </div>
              <div className="bg-blue-200 flex-4/5 lg:flex-3/4">
                <div className="flex space-x-2">
                  <p>Steam Account</p>
                  <p>отзывы</p>
                  <p>отзывы</p>
                  <p>отзывы</p>
                  <p>отзывы</p>
                </div>
                {/* <p>
                  Когда зареган акк, основная инфа, сколько игр,SteamID Запреты
                  и ограничения трейд ссылка Формула для рейтинга аккаунта,
                  доверие к челу
                </p> */}
                <p className="bold text-2xl">{user?.personaName}</p>
                <p>Custom URL: {" " + user?.profileUrl}</p>
                <p>SteamID64: {" " + user?.id}</p>
                <p>Realname: {" " + user?.realname}</p>
                <p>Joined Steam: {user?.timeCreated}</p>
                <div>
                  <p>Comments:</p>
                  {user?.commentsAsRecipient.map((comment) => (
                    <Comment
                      key={comment?.id}
                      authorId={comment?.authorId}
                      content={comment?.content}
                      createdAt={comment?.createdAt}
                      updatedAt={comment?.updatedAt}
                      username={comment?.author.username}
                      avatar={comment?.author.avatar}
                    />
                  ))}
                </div>
                <div className="w-full max-w-lg p-6 bg-blue-200 rounded-lg shadow-md">
                  <h2 className="text-lg  font-semibold mb-4">Leave comment</h2>
                  <textarea
                    className="w-full h-32 p-4 border bg-blue-300 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Ender your comment..."
                  ></textarea>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
