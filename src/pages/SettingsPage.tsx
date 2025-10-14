import { Container } from "@/components/container";
import { PageLoader } from "@/components/Loader";
import { CS2Tracker } from "@/components/SettingsPage/CS2Tracker";
import { SettingsProfile } from "@/components/SettingsPage/SettingsProfile";
import { SettingsSocialLinks } from "@/components/SettingsPage/SettingsSocialLinks";
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

      <div className="h-full flex justify-center mt-16">
        {loading ? (
          <>
            <PageLoader />
          </>
        ) : (
          <Container className="max-w-[1280px]">
            <div className="md:flex justify-center space-x-12">
              <div className="h-full w-full md:w-1/5 mb-4 py-2 md:px-2 rounded-md outline-1 outline-light-gray text-white">
                <div className="flex flex-col space-y-1">
                  <button
                    className={cn(
                      currentPage == "Profile" && "text-light-blue",
                      "rounded-md cursor-pointer"
                    )}
                    onClick={() => setCurrentPage(rightSide.profile)}
                  >
                    <p className="font-semibold text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
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
                    <p className="font-semibold text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
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
                    <p className="font-semibold text-s text-left ml-4 p-2 hover:text-light-blue-2 transition-all duration-100 px-2">
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
          </Container>
        )}
      </div>
    </>
  );
};
