import { Container } from "@/component/container";
import { SettingsProfile } from "@/component/SettingsPage/SettingsProfile";
import { SettingsSocialLinks } from "@/component/SettingsPage/SettingsSocialLinks";
import { cn } from "@/lib/utils";
import { backgroundColors, textColors } from "@/styles/colors";
import { rounded } from "@/styles/rounded";
import { Header } from "@/views/Header";
import { useState } from "react";

export const SettingsPage = () => {
  const rightSide = { profile: "Profile", sociallinks: "SocialLinks" };
  const [currentPage, setCurrentPage] = useState<string>(rightSide.profile);
  return (
    <>
      <Header />
      <div
        className={
          backgroundColors.main + "h-full min-h-screen pt-8 flex justify-center"
        }
      >
        <Container>
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
            {currentPage == "Profile" && <SettingsProfile />}
            {currentPage == "SocialLinks" && <SettingsSocialLinks />}
          </div>
        </Container>
      </div>
    </>
  );
};
