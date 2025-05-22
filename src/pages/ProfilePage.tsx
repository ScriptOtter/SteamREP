import { href, redirect, useNavigate, useParams } from "react-router-dom";
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
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface RouteParams {
  id: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const { id } = useParams<RouteParams>();

  const [user, setUser] = useState<AxiosResponse<ISteamUser>>();
  const [comments, setComments] = useState<AxiosResponse<IComment>>([]);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "createProfile") {
          const res = await getSteamUser(id);
          const comments = await getComments(id);
          console.log(res);
          if (!res.id) {
            console.log("User not found");
            setError("User not found!");
            setShowError(true);
            setLoading(false);
            return;
          }
          setUser(res);
          setComments(comments);
          setShowError(false);
          setError("");
          setLoading(false);
        }
      } catch (e) {
        setError(e);
        console.log("Ошибка, перезагрузка страницы");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData(id);
  }, [id]);
  const handleRedirect = () => {
    window.location.href = "http://localhost:3000/api/steam/verify";
  };

  return (
    <>
      <Header />
      {id !== "createProfile" ? (
        <div className="w-full h-screen pt-8 bg-gray-900 flex justify-center">
          <div className="container max-w-[1280px] mt-2">
            {!showError ? (
              <div className="flex">
                <div className="ml-2 lg:w-[320px] w-[256px]">
                  <div className="flex justify-center items-center">
                    {loading ? (
                      <Skeleton className="h-[288px] w-[288px] rounded-full" />
                    ) : (
                      <img
                        src={user?.avatar}
                        className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-gray-500"
                      />
                    )}
                  </div>
                  <div className="ml-7 mt-2">
                    {loading ? (
                      <Skeleton className="h-7 w-[25%]" />
                    ) : (
                      <p className="text-2xl text-bold text-white mt-2">
                        {user?.realname ? user?.realname : ""}
                      </p>
                    )}
                    {loading ? (
                      <Skeleton className="h-5 w-[50%] mt-2" />
                    ) : (
                      <p className="text-s text-bold text-white mt-1">TG </p>
                    )}
                    {loading ? (
                      <Skeleton className="h-5 w-[50%] mt-2" />
                    ) : (
                      <p className="text-s text-bold text-white mt-1">
                        Youtube
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button className="bg-gray-500 w-[90%] rounded p-1 mt-2 outline-1 outline-gray-300 cursor-pointer">
                      <p className="text-bold text-white">Edit Profile</p>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-800 flex-4/5 lg:flex-3/4 mx-4 my-4 rounded">
                  <ProfileTabs />

                  <SteamInformation user={user} loading={loading} />
                  <p className="mx-4 my-4 text-2xl text-white">Comments:</p>
                  <CommentTextArea />

                  {Array.isArray(comments) &&
                    comments?.map((comment: IComment) => (
                      <Comment
                        key={comment?.id}
                        content={comment?.content}
                        createdAt={comment?.createdAt}
                        updatedAt={comment?.updatedAt}
                        username={comment?.author.username}
                        avatar={
                          comment?.author?.steamUser?.avatar ||
                          comment?.author?.avatar
                        }
                        loading={loading}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-red-600 text-3xl">{error}</p>
              </div>
            )}
            {/* <p>
                  Когда зареган акк, основная инфа, сколько игр,SteamID Запреты
                  и ограничения трейд ссылка Формула для рейтинга аккаунта,
                  доверие к челу
                </p> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen bg-gray-900">
          <div className="flex justify-center items-center text-white text-4xl">
            <button
              className="cursor-pointer bg-indigo-500 p-16"
              onClick={handleRedirect}
            >
              Создать профиль!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
