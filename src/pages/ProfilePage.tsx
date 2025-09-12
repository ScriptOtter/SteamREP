import { useParams } from "react-router-dom";
import { Header } from "../views/Header";
import { useEffect, useState } from "react";
import { getSteamUser, getViewers } from "../data/getUser.ts";
import { ISteamUser } from "../models/ISteamUser.ts";
import { SteamInformation } from "../component/ProfilePage/SteamInformation.tsx";
import axios, { AxiosError } from "axios";
import { ProfileLeftSide } from "@/component/ProfilePage/ProfileLeftSide.tsx";
import { Container } from "@/component/container.tsx";
import { cn } from "@/lib/utils.ts";
import { ProfileComments } from "@/component/ProfilePage/ProfileComments.tsx";
import { PageLoader } from "@/component/Loader.tsx";
import { backgroundColors } from "@/styles/colors.ts";
import { CS2Stats } from "@/component/ProfilePage/CS2Stats.tsx";
import { CS2Matches } from "@/component/CS2MatchesPage/CS2Matches.tsx";

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
  const [viewers, setViewers] = useState<number>(0);

  const menu: { [key: string]: string } = {
    SteamInformation: "Steam Information",
    Comments: "Comments",
    CS2: "CS2",
    UsersComments: "Users Comments",
  };

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        if (id !== "createProfile") {
          const res = await getSteamUser(id);

          //console.log(res);
          if (!res.id) {
            //console.log("User not found");
            setError("User not found!");
            setShowError(true);
            setLoading(false);
            return;
          }
          const viewers = await getViewers(res.id);

          setViewers(viewers);
          steamSteamUser(res);

          setShowError(false);
          setError("");
          setLoading(false);
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) setError(e);
        else if (e instanceof Error) setError(e.message);
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

      <div className={"flex justify-center"}>
        <Container
          className={cn(
            (currentPage === "CS2" || currentPage === "CS2Matches") &&
              "transition-all duration-200 max-w-[90%]"
          )}
        >
          {!showError ? (
            <div
              className={
                "flex flex-col items-center md:flex-row md:items-start w-full mb-4"
              }
            >
              {loading && currentPage != "CS2Matches" ? (
                <div className="ml-2 lg:w-[280px] w-[225px] lg:h-[280px] h-[225px]">
                  <div className="lg:w-[280px] w-[225px] lg:h-[280px] h-[225px] rounded-full ring-1 ring-light-gray animate-pulse" />
                </div>
              ) : (
                currentPage != "CS2Matches" && (
                  <ProfileLeftSide user={steamUser} viewers={viewers} />
                )
              )}
              <div className="md:mx-4 w-full">
                <nav className="flex justify-center text-white text-md md:text-xl py-2 mt-4 md:mx-4 md:px-2 rounded-xl outline-1 outline-light-gray">
                  <div className="flex">
                    {Object.keys(menu).map((key) => (
                      <div
                        className={cn(
                          currentPage === menu[key].replace(/\s+/g, "") &&
                            "text-light-blue",
                          "cursor-pointer hover:text-light-blue-2 duration-100 px-2"
                        )}
                        onClick={() => {
                          setCurrentPage(menu[key].replace(/\s+/g, ""));
                          window.location.hash = menu[key].replace(/\s+/g, "");
                        }}
                      >
                        {menu[key]}
                      </div>
                    ))}
                  </div>
                </nav>
                {(currentPage === "CS2" || currentPage === "CS2Matches") && (
                  <nav
                    className={
                      "flex text-white text-md ml-1 mt-4 px-1 w-min rounded-xl"
                    }
                  >
                    <div
                      className={cn(
                        currentPage === "CS2"
                          ? "bg-light-blue rounded-l-xl"
                          : backgroundColors.darkMain + "rounded-l-xl",
                        "cursor-pointer hover:bg-light-blue-2 hover:rounded-l-xl px-3 duration-300"
                      )}
                      onClick={() => {
                        setCurrentPage("CS2");
                        window.location.hash = "#CS2"; // Добавляем # в URL
                      }}
                    >
                      Stats
                    </div>
                    <div
                      className={cn(
                        currentPage === "CS2Matches"
                          ? "bg-light-blue rounded-r-xl"
                          : backgroundColors.darkMain + "rounded-r-xl",
                        "cursor-pointer hover:bg-light-blue-2 hover:rounded-r-xl px-1 duration-300"
                      )}
                      onClick={() => {
                        setCurrentPage("CS2Matches");
                        window.location.hash = "#CS2Matches"; // Добавляем # в URL
                      }}
                    >
                      Matches
                    </div>
                  </nav>
                )}
                <div
                  className={cn(
                    currentPage !== "Comments" && "py-1",
                    "w-full mt-4 rounded-lg outline-1 outline-gray-shadow"
                  )}
                >
                  {currentPage === "SteamInformation" &&
                    (loading ? (
                      <PageLoader />
                    ) : (
                      <SteamInformation user={steamUser} />
                    ))}
                  {currentPage === "Comments" && <ProfileComments />}
                  {currentPage === "CS2" && (
                    <CS2Stats steamid={steamUser?.id} />
                  )}
                  {currentPage === "CS2Matches" && <CS2Matches />}
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
        </Container>
      </div>
    </>
  );
};

//TODO:
//Рейтинг профиля по лайку, ачиквки, список по рейтингу
