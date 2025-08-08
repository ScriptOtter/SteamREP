import { Container } from "@/component/container";
import { PageLoader } from "@/component/Loader";
import { SettingsProfile } from "@/component/SettingsPage/SettingsProfile";
import { SettingsSocialLinks } from "@/component/SettingsPage/SettingsSocialLinks";
import { getMySocialLinks } from "@/data/socialLinks";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { ISocialLinks } from "@/models/ISocialLinks";
import { backgroundColors, textColors } from "@/styles/colors";
import { rounded } from "@/styles/rounded";
import { Header } from "@/views/Header";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const rightSide = { profile: "Profile", sociallinks: "SocialLinks" };
  const [currentPage, setCurrentPage] = useState<string>(rightSide.profile);
  const navigate = useNavigate();

  const auth = useAuth();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<ISocialLinks>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const links = await getMySocialLinks(dispatch, auth);
      if (links) setInputValue(links);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(auth.isAuth);
    if (auth.isAuth == false) navigate("/");
  }, [auth.isAuth]);

  return (
    <>
      <Header />

      <div
        className={
          backgroundColors.main + "h-full min-h-screen pt-8 flex justify-center"
        }
      >
        <Container>
          {loading ? (
            <>
              <PageLoader />
            </>
          ) : (
            <div className="flex justify-center space-x-4">
              <div
                className={
                  backgroundColors.darkMain +
                  rounded.small +
                  "w-1/3 h-full py-2 px-2"
                }
              >
                <div className="flex flex-col space-y-1">
                  <button
                    className={
                      rounded.small +
                      cn(
                        currentPage == "Profile" && backgroundColors.lightMain,
                        "cursor-pointer"
                      )
                    }
                    onClick={() => setCurrentPage(rightSide.profile)}
                  >
                    <p
                      className={
                        cn(
                          currentPage === "Profile"
                            ? textColors.orange
                            : textColors.white
                        ) + " text-s text-left ml-4 p-2"
                      }
                    >
                      Profile
                    </p>
                  </button>
                  <button
                    className={
                      rounded.small +
                      cn(
                        currentPage == "SocialLinks" &&
                          backgroundColors.lightMain,
                        "cursor-pointer"
                      )
                    }
                    onClick={() => setCurrentPage(rightSide.sociallinks)}
                  >
                    <p
                      className={
                        cn(
                          currentPage === "SocialLinks"
                            ? textColors.orange
                            : textColors.white
                        ) + " text-s text-left ml-4 p-2"
                      }
                    >
                      Social links
                    </p>
                  </button>
                </div>
              </div>

              <>
                {currentPage == "Profile" && (
                  <SettingsProfile inputValue={inputValue} auth={auth} />
                )}
                {currentPage == "SocialLinks" && (
                  <SettingsSocialLinks inputValue={inputValue} />
                )}
              </>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
