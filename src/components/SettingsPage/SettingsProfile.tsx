import { SettingsProfileItems } from "./SettingsProfileItems";
import { saveTradeLink } from "@/data/profileLinks";
import { CountryItem } from "./CountryItem";
import { SettingsLayout } from "./SettingsLayout";
import { FindLinkItem } from "./FindLinkItem";
import { Copy } from "lucide-react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

function modifyString(input: string): string {
  const mail = input.split("@")[1];

  const partToModify = input.slice(3);

  const twentyPercentLength = Math.floor(partToModify.length * 0.3);

  const modifiedPart = "*".repeat(twentyPercentLength);

  const result = input.slice(0, 3) + modifiedPart + "@" + mail;

  return result;
}
export const SettingsProfile = ({ ...props }) => {
  const { auth, inputValue } = props;
  const [visibleEmail, setVisibleEmail] = useState<boolean>(true);

  return (
    <>
      <SettingsLayout header={"Account Settings"}>
        <div className="relative">
          <SettingsProfileItems
            key={1}
            title="Unique SteamREP"
            disabled={true}
            description="Your Personal link to your SteamREP Profile"
            valueInput={
              auth.role == "VERIFIED"
                ? "https://steamrep.help/profile/" + auth.id
                : "You need to connect Steam Account"
            }
          />
          <div className="absolute md:top-11.5 bottom-6.5 right-9">
            {auth.role == "VERIFIED" && (
              <Copy
                onClick={() =>
                  navigator.clipboard.writeText(
                    "https://steamrep.help/profile/" + auth.id || ""
                  )
                }
                size={18}
                className="mt-2 mr-2 cursor-pointer text-white hover:text-light-blue-2"
              />
            )}
          </div>
        </div>
        <div className="relative">
          <SettingsProfileItems
            key={2}
            title="Your email"
            disabled={true}
            valueInput={visibleEmail ? modifyString(auth?.email) : auth?.email}
          />

          <div className="absolute md:top-11.5 bottom-6.5 right-9">
            {auth.role == "VERIFIED" && (
              <>
                {visibleEmail ? (
                  <MdVisibility
                    onClick={() => setVisibleEmail((prev) => !prev)}
                    size={18}
                    className="mt-2 mr-2 cursor-pointer text-white hover:text-light-blue-2"
                  />
                ) : (
                  <MdVisibilityOff
                    onClick={() => setVisibleEmail((prev) => !prev)}
                    size={18}
                    className="mt-2 mr-2 cursor-pointer text-white hover:text-light-blue-2"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <CountryItem auth={auth} />
        <SettingsProfileItems
          key={3}
          title="Your Trade-Link"
          description="Trade Link will be displayed on SteamREP"
          valueInput={inputValue?.tradeLink && inputValue.tradeLink}
          placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
          disabled={false}
          onClick={saveTradeLink}
        />
        <div className="ml-6 pb-2">
          <FindLinkItem name={"trade"} />
        </div>
      </SettingsLayout>
    </>
  );
};
