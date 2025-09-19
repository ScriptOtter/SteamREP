import { SettingsProfileItems } from "./SettingsProfileItems";
import { saveTradeLink } from "@/data/profileLinks";
import { CountryItem } from "./CountryItem";
import { SettingsLayout } from "./SettingsLayout";
import { FindLinkItem } from "./FindLinkItem";
import { Copy } from "lucide-react";

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

  return (
    <>
      <SettingsLayout header={"Profile"}>
        <div className="relative">
          <SettingsProfileItems
            key={1}
            title="Unique SteamREP"
            disabled={true}
            description="Your Personal link to your SteamREP Profile"
            valueInput={
              auth.role == "VERIFIED"
                ? "steamrep.help/profile/" + auth.id
                : "You need to connect Steam Account"
            }
          />
          <div className="absolute md:top-11.5 bottom-6.5 right-9">
            <Copy
              onClick={() =>
                navigator.clipboard.writeText(
                  "https://steamrep.help/profile/" + auth.id || ""
                )
              }
              size={17}
              className="mt-1.5 cursor-pointer text-white hover:text-light-blue-2"
            />
          </div>
        </div>

        <SettingsProfileItems
          key={2}
          title="Your email"
          disabled={true}
          valueInput={(auth?.email && modifyString(auth?.email)) || ""}
          onClick={() => {}}
        />

        <CountryItem auth={auth} />
        <SettingsProfileItems
          key={3}
          title="Your Trade-Link"
          description="Trade Link will be displayed on SteamREP"
          valueInput={inputValue?.tradeLink && inputValue.tradeLink}
          placeholder="steamcommunity.com/tradeoffer/new/?partner=15"
          onClick={saveTradeLink}
        />
        <div className="ml-6 pb-2">
          <FindLinkItem name={"trade"} />
        </div>
      </SettingsLayout>
    </>
  );
};
