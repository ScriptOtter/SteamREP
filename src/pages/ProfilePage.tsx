import { useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { useEffect, useState } from "react";
import { getSteamUser } from "../data/getUser.ts";
import { ISteamUser } from "../models/ISteamUser.ts";
import { SteamInformation } from "../component/ProfilePage/SteamInformation.tsx";
import axios, { AxiosError } from "axios";
import { ProfileLeftSide } from "@/component/ProfilePage/ProfileLeftSide.tsx";
import { Container } from "@/component/container.tsx";
import { cn } from "@/lib/utils.ts";
import { ProfileComments } from "@/component/ProfilePage/ProfileComments.tsx";
import { ProfileCreate } from "@/component/ProfilePage/ProfileCreate.tsx";
import { PageLoader } from "@/component/Loader.tsx";
import { backgroundColors } from "@/styles/colors.ts";

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

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "createProfile") {
          const res = await getSteamUser(id);
          console.log(res);
          if (!res.id) {
            console.log("User not found");
            setError("User not found!");
            setShowError(true);
            setLoading(false);
            return;
          }
          steamSteamUser(res);

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

  const [currentPage, setCurrentPage] = useState<string>("SteamInformation");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", ""); // Получаем хэш без #
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("SteamInformation"); // Если хэш пустой, устанавливаем значение по умолчанию
      }
    };

    // Устанавливаем обработчик события при монтировании компонента
    window.addEventListener("hashchange", handleHashChange);

    // Вызываем функцию при первом рендере, чтобы установить начальное значение
    handleHashChange();

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);
  return (
    <>
      <Header />
      {id !== "createProfile" ? (
        <div
          className={
            backgroundColors.main +
            "h-full min-h-screen pt-8 flex justify-center"
          }
        >
          <Container>
            {!showError ? (
              <div className="flex">
                {loading ? (
                  <div className="ml-2 lg:w-[320px] w-[256px]">
                    <div className="lg:w-[280px] w-[225px] lg:h-[280px] h-[225px] rounded-full ring-1 ring-gray-500 animate-pulse" />
                  </div>
                ) : (
                  <ProfileLeftSide user={steamUser} />
                )}

                <div
                  className={
                    backgroundColors.darkMain + "w-[75%] mx-4 my-2 rounded"
                  }
                >
                  <nav className="flex items-center mx-4 text-white text-xl my-2">
                    <div className="flex space-x-3">
                      <div
                        className={cn(
                          currentPage === "SteamInformation" &&
                            "text-orange-500",
                          "cursor-pointer hover:text-orange-400 duration-600"
                        )}
                        onClick={() => {
                          setCurrentPage("SteamInformation");
                          window.location.hash = "#SteamInformation"; // Добавляем # в URL
                        }}
                      >
                        Steam Information
                      </div>
                      <div
                        className={cn(
                          currentPage === "Comments" && "text-orange-500",
                          "cursor-pointer hover:text-orange-400 duration-600"
                        )}
                        onClick={() => {
                          setCurrentPage("Comments");
                          window.location.hash = "#Comments"; // Добавляем # в URL
                        }}
                      >
                        Comments
                      </div>
                      <div
                        className={cn(
                          currentPage === "CS2Stats" && "text-orange-500",
                          "cursor-pointer hover:text-orange-400 duration-600"
                        )}
                        onClick={() => {
                          setCurrentPage("CS2Stats");
                          window.location.hash = "#CS2Stats"; // Добавляем # в URL
                        }}
                      >
                        CS2 Stats
                      </div>

                      <div
                        className={cn(
                          currentPage === "UsersComments" && "text-orange-500",
                          "cursor-pointer hover:text-orange-400 duration-600"
                        )}
                        onClick={() => {
                          setCurrentPage("UsersComments");
                          window.location.hash = "#UsersComments"; // Добавляем # в URL
                        }}
                      >
                        Users Comments
                      </div>
                    </div>
                  </nav>
                  {currentPage === "SteamInformation" &&
                    (loading ? (
                      <PageLoader />
                    ) : (
                      <SteamInformation user={steamUser} />
                    ))}
                  {currentPage === "Comments" && <ProfileComments />}
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
          </Container>
        </div>
      ) : (
        <ProfileCreate />
      )}
    </>
  );
};
