import { backgroundColors, color, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { saveTradeLink } from "@/data/profileLinks";
import ReactCountryFlag from "react-country-flag";
import { rounded } from "@/styles/rounded";
import { steamVerification } from "@/lib/steamVerification";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SettingsProfile = ({ ...props }) => {
  const { auth, inputValue } = props;
  const [input, setInput] = useState<string>(props.valueInput || "");
  return (
    <>
      <div className={backgroundColors.darkMain + "w-full rounded-t-2xl"}>
        <div className={backgroundColors.lightMain + "rounded-t-2xl"}>
          <h1 className={textColors.white + "p-6 text-xl font-bold"}>
            Profile
          </h1>
        </div>

        <SettingsProfileItems
          key={1}
          title="Unique SteamREP URL"
          disabled={true}
          description="Your Personal link to your SteamREP Profile"
          valueInput={
            auth.role == "VERIFIED"
              ? "https://steamrep.help/profile/" + auth.id
              : "You need to connect Steam Account"
          }
        />
        <SettingsProfileItems
          key={2}
          title="Your email"
          disabled={true}
          valueInput={auth?.email || ""}
          onClick={() => {}}
        />
        <div className="px-6 py-4 relative">
          <div className="flex w-full">
            <div className="flex space-x-4">
              <div className="w-[34%]">
                <p
                  className={
                    textColors.white +
                    cn(!props.description && "text-red-200") +
                    "text-s"
                  }
                >
                  Your email
                </p>
              </div>
              <div>
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
            </div>
          </div>

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
              {!auth.country ? (
                <div className="flex items-center space-x-2 ml-2">
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
                  <button
                    onClick={steamVerification}
                    className="cursor-pointer"
                  >
                    <p className="text-xl text-white">Login via Steam</p>
                  </button>
                  <img className="w-6 h-6" src="/public/assets/steam.svg" />
                </div>
              )}
            </div>
          </div>

          <SettingsProfileItems
            key={4}
            title="Your Trade-Link"
            description="Trade Link will be displayed on SteamREP"
            valueInput={inputValue?.tradeLink && inputValue.tradeLink}
            placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
            onClick={saveTradeLink}
          />
        </div>
      </div>
    </>
  );
};
