import ReactCountryFlag from "react-country-flag";
import { rounded } from "@/styles/rounded";
import { steamVerification } from "@/lib/steamVerification";
import { cn } from "@/lib/utils";
import { backgroundColors, textColors } from "@/styles/colors";

export const CountryItem = ({ ...props }) => {
  const { auth } = props;
  return (
    <>
      <div className="px-6 py-4 relative">
        <div
          className={backgroundColors.lightMain + "w-min-max h-[1px] mb-4"}
        ></div>
        <div className="flex w-full">
          <div className="flex space-x-4 justify-between">
            <div className="w-full">
              <p
                className={
                  textColors.white +
                  cn(!props.description && "text-red-200") +
                  "text-s"
                }
              >
                Your country
              </p>
              <p className={textColors.gray + "text-xs"}>
                Your country from your Steam profile
              </p>
            </div>
            {auth.country ? (
              <div className="flex items-center space-x-2 ml-8">
                <ReactCountryFlag
                  countryCode={auth.country || ""}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  aria-label=""
                />

                <p className={textColors.white + "text-xl"}>{auth.country}</p>
              </div>
            ) : (
              <div
                className={
                  rounded.small +
                  "flex justify-center w-full ml-8 items-center bg-blue-500 px-2"
                }
              >
                <button onClick={steamVerification} className="cursor-pointer">
                  <p className="text-xl text-white">Login via Steam</p>
                </button>
                <img className="w-6 h-6" src="/public/assets/steam.svg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
