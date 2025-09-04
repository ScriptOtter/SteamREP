import { FindLinkItem } from "./FindLinkItem";
import { SettingsLayout } from "./SettingsLayout";
import { SettingsProfileItems } from "./SettingsProfileItems";

export const CS2Tracker = () => {
  return (
    <>
      <SettingsLayout header={"CS2 Tracker"}>
        <SettingsProfileItems
          key={1}
          title="Authentication code"
          valueInput={""}
          description="Game authentication code"
          placeholder="XXXX-XXXXX-XXXX"
          onClick={() => {}}
        />
        <SettingsProfileItems
          key={2}
          title="Last match code"
          valueInput={""}
          description="Your last competitive match code"
          placeholder="CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
          onClick={() => {}}
        />
        <div className="ml-6 pb-2">
          <FindLinkItem name={"cs"} />
        </div>
      </SettingsLayout>
    </>
  );
};
