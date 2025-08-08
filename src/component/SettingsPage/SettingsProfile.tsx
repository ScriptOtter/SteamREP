import { backgroundColors, textColors } from "@/styles/colors";
import { SettingsProfileItems } from "./SettingsProfileItems";
import { saveTradeLink } from "@/data/profileLinks";

export const SettingsProfile = ({ ...props }) => {
  const { auth, inputValue } = props;
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
        <SettingsProfileItems
          key={3}
          title="Your country"
          description="Your country from your Steam profile"
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={4}
          title="Your Trade-Link"
          description="Trade Link will be displayed on SteamREP"
          valueInput={inputValue?.tradeLink && inputValue.tradeLink}
          placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
          onClick={saveTradeLink}
        />
      </div>
    </>
  );
};
