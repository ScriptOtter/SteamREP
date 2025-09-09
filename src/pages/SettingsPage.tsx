import { Container } from "@/component/container";
import { PageLoader } from "@/component/Loader";
import { CS2Tracker } from "@/component/SettingsPage/CS2Tracker";
import { SettingsProfile } from "@/component/SettingsPage/SettingsProfile";
import { SettingsSocialLinks } from "@/component/SettingsPage/SettingsSocialLinks";
import { getMySocialLinks } from "@/data/socialLinks";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { ISocialLinks } from "@/models/ISocialLinks";
import { Header } from "@/views/Header";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const rightSide = {
    profile: "Profile",
    sociallinks: "SocialLinks",
    cstracker: "CSTracker",
  };
  const [currentPage, setCurrentPage] = useState<string>(rightSide.profile);
  console.log(currentPage);
  const navigate = useNavigate();

  const auth = useAuth();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<ISocialLinks>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const links = await getMySocialLinks(dispatch, auth);
      if (links) {
        setInputValue(links);
      }
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

      <div className="h-full flex justify-center">
        <Container>
          {loading ? (
            <>
              <PageLoader />
            </>
          ) : (
            <div className="md:flex justify-center space-x-4 mx-4">
              <div className=" md:w-1/3 h-full w-full mb-4 py-2 md:px-2 rounded-md outline-1 outline-light-gray text-white">
                <div className="flex flex-col space-y-1">
                  <button
                    className={cn(
                      currentPage == "Profile" && "text-light-blue",
                      "rounded-md cursor-pointer"
                    )}
                    onClick={() => setCurrentPage(rightSide.profile)}
                  >
                    <p className="text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
                      Profile
                    </p>
                  </button>
                  <button
                    className={cn(
                      currentPage == "SocialLinks" && "text-light-blue",
                      "rounded-md cursor-pointer"
                    )}
                    onClick={() => setCurrentPage(rightSide.sociallinks)}
                  >
                    <p className="text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
                      Social links
                    </p>
                  </button>
                  <button
                    className={cn(
                      currentPage == "CSTracker" && "text-light-blue",
                      "rounded-md cursor-pointer"
                    )}
                    onClick={() => setCurrentPage(rightSide.cstracker)}
                  >
                    <p className="text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
                      CS Tracker
                    </p>
                  </button>
                </div>
              </div>

              {currentPage == "Profile" && (
                <SettingsProfile inputValue={inputValue} auth={auth} />
              )}
              {currentPage == "SocialLinks" && (
                <SettingsSocialLinks inputValue={inputValue} />
              )}
              {currentPage == "CSTracker" && <CS2Tracker />}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
