import { redirect, useNavigate, useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { useEffect, useState } from "react";
import { getMe, getSteamUser } from "../data/getUser.ts";
import { ISteamUser } from "../models/ISteamUser.ts";
import { Comment } from "../component/Comment.tsx";
import { SteamInformation } from "../component/SteamInformation.tsx";
import { ProfileTabs } from "../component/ProfileTabs.tsx";
import { CommentTextArea } from "../component/CommentTextArea.tsx";
import { getComments } from "../data/getComments.ts";
import { IComment } from "../models/IComment.ts";
import axios from "axios";

interface ProfileParams {
  id: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const { id } = useParams<ProfileParams>();

  const [user, setUser] = useState<ISteamUser>();
  const [comments, setComments] = useState<IComment>();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "me") {
          const res = await getSteamUser(id);
          setUser(res);
          const comments = await getComments(id);
          setComments(comments);
          setLoading(false);
          return;
        }
        const res = getMe();
        if (!res) {
          navigate("/");
        }
        console.log(res.steamUser);
        if (!res.steamUser) {
          console.log("!res" + res);
          setUser(res);
          return;
        }

        setUser(res.steamUser);
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
          <div className="container max-w-[1280px] mt-2">
            <div className="flex">
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
              <div className="bg-gray-800 flex-4/5 lg:flex-3/4 mx-4 my-4 rounded">
                <button
                  className="cursor-pointer hover:bg-red-700"
                  onClick={() => {
                    redirect("http://localhost:3000/api/steam/verify");
                  }}
                >
                  НАЖМИ
                </button>
                <ProfileTabs />

                <SteamInformation user={user} />
                <p className="mx-4 my-4 text-2xl text-white">Comments:</p>
                <CommentTextArea />

                {comments?.map((comment) => (
                  <Comment
                    key={comment?.id}
                    author={comment?.author}
                    content={comment?.content}
                    createdAt={comment?.createdAt}
                    updatedAt={comment?.updatedAt}
                    username={comment?.author.username}
                    avatar={
                      comment?.author?.steamUser?.avatar ||
                      comment?.author?.avatar
                    }
                  />
                ))}
              </div>
            </div>
            {/* <p>
                  Когда зареган акк, основная инфа, сколько игр,SteamID Запреты
                  и ограничения трейд ссылка Формула для рейтинга аккаунта,
                  доверие к челу
                </p> */}

            <div></div>
          </div>
        </div>
      </>
    );
};
