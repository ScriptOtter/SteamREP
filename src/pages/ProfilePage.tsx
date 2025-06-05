import { useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { useEffect, useState } from "react";
import { getSteamUser } from "../data/getUser.ts";
import { ISteamUser } from "../models/ISteamUser.ts";
import { Comment } from "../component/Comment.tsx";
import { SteamInformation } from "../component/SteamInformation.tsx";
import { ProfileTabs } from "../component/ProfileTabs.tsx";
import { CommentTextArea } from "../component/CommentTextArea.tsx";
import { getComments } from "../data/getComments.ts";
import { IComment } from "../models/IComment.ts";
import axios, { AxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth.ts";
import { API_ENDPOINTS } from "@/services/apiService.ts";
import { createApi } from "@/services/axios.ts";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";

export interface RouteParams {
  [key: string]: string | undefined;
  id?: string;
}

export const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | string | null>();
  const [showError, setShowError] = useState<boolean>(false);
  const { id } = useParams<RouteParams>();

  const [steamUser, steamSteamUser] = useState<ISteamUser>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const auth = useAuth();
  const api = createApi(dispatch);

  const hendlePost = async (res: IComment) => {
    const comments = await getComments(id!);
    setComments(comments);
    console.log(res);
  };

  const toastDelete = async (commentsId: string) => {
    toast.warning(
      <button
        onClick={async () => await deteleComment(commentsId)}
        className="cursor-pointer underline underline-offset-2"
      >
        Сonfirm delete action
      </button>,
      { theme: "dark" }
    );
  };
  const deteleComment = async (commentId: string) => {
    const res = await api.delete(API_ENDPOINTS.commentDelete + commentId, {
      withCredentials: true,
    });

    const comments = await getComments(id!);
    setComments(comments);
    console.log(res);
  };

  const updateComment = async (commentId: string, content: string) => {
    const res = await api.patch(
      API_ENDPOINTS.commentDelete + commentId,
      { content: content },
      {
        withCredentials: true,
      }
    );
    const comments = await getComments(id!);
    setComments(comments);
    console.log(res);
  };

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "createProfile") {
          const res = await getSteamUser(id);
          const comments = await getComments(id);
          console.log(res);
          //console.log(res);
          if (!res.id) {
            console.log("User not found");
            setError("User not found!");
            setShowError(true);
            setLoading(false);
            return;
          }
          steamSteamUser(res);
          setComments(comments);
          setShowError(false);
          setError("");
          setLoading(false);
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) setError(e);
        else if (e instanceof Error) setError(e.message);
        console.log("Ошибка, перезагрузка страницы");
        console.log(e);
      }
    };
    if (id) fetchData(id);
  }, [id]);

  const handleRedirect = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "steam/verify";
  };

  return (
    <>
      <Header />
      {id !== "createProfile" ? (
        <div className="h-screen pt-8 bg-[#2F3136] flex justify-center">
          <div className="container max-w-[1280px] mt-2">
            {!showError ? (
              <div className="flex">
                <div className="ml-2 lg:w-[320px] w-[256px]">
                  <div className="flex justify-center items-center">
                    {loading ? (
                      <Skeleton className="h-[288px] w-[288px] rounded-full" />
                    ) : (
                      <img
                        src={steamUser?.avatar}
                        className="inline-block h-[95%] w-[95%] rounded-full ring-1 ring-gray-500"
                      />
                    )}
                  </div>
                  <div className="ml-7 mt-2">
                    {loading ? (
                      <Skeleton className="h-7 w-[25%]" />
                    ) : (
                      <div className="flex items-center relative">
                        <p className="text-2xl text-bold text-white mt-2 flex items-center">
                          {steamUser?.personaName ? steamUser?.personaName : ""}
                          {steamUser?.user?.role === "VERIFIED_STEAM" && (
                            <div className="">
                              <MdVerified
                                size={22}
                                className="ml-1.5 text-blue-400 mt-[3px] cursor-pointer"
                                onMouseEnter={() => {
                                  setIsHovered(true);
                                  console.log(isHovered);
                                }}
                                onMouseLeave={() => {
                                  setIsHovered(false);
                                  console.log(isHovered);
                                }}
                              />
                            </div>
                          )}
                        </p>
                        {isHovered && (
                          <span className="absolute left-25 mt-2 p-1 text-sm bg-gray-700 text-white rounded-md">
                            Steam Verified
                          </span>
                        )}
                      </div>
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
                <div className="bg-[#36393F] w-[75%] mx-4 my-4 rounded">
                  <ProfileTabs />

                  <SteamInformation user={steamUser} />

                  {auth.isAuth && (
                    <CommentTextArea
                      hendlePost={hendlePost}
                      loading={loading}
                    />
                  )}
                  <div>
                    {Array.isArray(comments) &&
                      comments?.map((comment: IComment) => (
                        <Comment
                          commentId={comment.id}
                          key={comment?.id}
                          content={comment?.content}
                          createdAt={comment?.createdAt}
                          updatedAt={comment?.updatedAt}
                          role={comment?.author?.role}
                          username={
                            comment?.author?.steamUser?.personaName ||
                            comment?.author.username
                          }
                          avatar={
                            comment?.author?.steamUser?.avatar ||
                            comment?.author?.avatar
                          }
                          loading={loading}
                          steamid={comment?.author?.steamUser?.id}
                          deteleComment={toastDelete}
                          updateComment={updateComment}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-red-600 text-3xl">{error?.toString()}</p>
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
