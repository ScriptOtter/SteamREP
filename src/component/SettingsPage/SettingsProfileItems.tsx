import { useAuth } from "@/hooks/use-auth";
import { steamVerification } from "@/lib/steamVerification";
import { cn } from "@/lib/utils";
import { backgroundColors, color, textColors } from "@/styles/colors";
import { rounded } from "@/styles/rounded";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

interface IProps {
  title: string;
  disabled?: boolean;
  description?: string;
  valueInput?: string;
  placeholder?: string;
  onClick?: (url: string) => void;
}

const handleTradeURL = () => {
  window.location.href =
    "https://steamcommunity.com/id/s3x4/tradeoffers/privacy#trade_offer_access_url";
};

export const SettingsProfileItems = ({ ...props }: IProps) => {
  const auth = useAuth();
  console.log(props);

  const [input, setInput] = useState<string>(props.valueInput || "");
  const { onClick } = props;
  return (
    <>
      <div className="px-6 py-4">
        <div
          className={backgroundColors.lightMain + "w-min-max h-[1px] mb-4"}
        ></div>
        <div className="flex space-x-4">
          <div className="w-[34%]">
            <p
              className={
                textColors.white +
                cn(!props.description && "text-red-200") +
                "text-s"
              }
            >
              {props.title}
            </p>
            <p className={textColors.gray + "text-xs"}>{props.description}</p>
          </div>
          {props.title != "Your country" && (
            <div
              className={
                backgroundColors.lightMain +
                rounded.small +
                "lg:w-full w-[420px] " +
                cn(props.onClick ? textColors.white : textColors.gray)
              }
            >
              <input
                placeholder={props.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={props.disabled}
                className={
                  "py-4 px-4 w-full h-full hover:outline-2 hover:rounded-s hover:outline-" +
                  color.gray
                }
              />
            </div>
          )}
          {props.title == "Your country" && auth.steamid && (
            <div className="flex items-center space-x-2 ">
              {auth.country && (
                <ReactCountryFlag
                  countryCode={auth.country || ""}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  aria-label=""
                />
              )}

              <p className={textColors.white + "text-xl"}>{auth.country}</p>
            </div>
          )}
          {props.title == "Your country" && !auth.country && (
            <div
              className={
                rounded.small +
                "flex justify-center items-center space-x-2 bg-blue-500 px-2"
              }
            >
              <button onClick={steamVerification} className="cursor-pointer">
                <p className="text-xl text-white">Login via Steam</p>
              </button>
              <img className="w-6 h-6" src="/public/assets/steam.svg" />
            </div>
          )}
        </div>

        {props.title == "Your Trade-Link" && (
          <button
            onClick={handleTradeURL}
            className={
              textColors.lightGray +
              cn(!props.description && "text-red-200") +
              "text-s mt-0.5 underline underline-offset-2 cursor-pointer"
            }
          >
            Find Trade-Link
          </button>
        )}

        {onClick &&
          props.title != "Your email" &&
          props.title != "Your country" && (
            <div className="mt-4">
              <button
                onClick={() => onClick(input)}
                className={
                  textColors.white +
                  backgroundColors.lightMain +
                  rounded.small +
                  "items-center w-full text-s p-1 cursor-pointer"
                }
              >
                Save Changes
              </button>
            </div>
          )}

        {props.title == "Your email" && (
          <div className="mt-4">
            <div
              className={
                backgroundColors.lightMain +
                rounded.small +
                "w-full text-s p-1 text-center"
              }
            >
              {auth.role == "NOT_ACTIVE" && (
                <p className="text-red-400">Email not confirmed!</p>
              )}{" "}
              {auth.role == "ACTIVE" ||
                (auth.role == "VERIFIED" && (
                  <p className="text-emerald-400">Email Verified!</p>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
