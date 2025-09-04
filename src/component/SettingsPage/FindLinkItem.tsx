import { textColors } from "@/styles/colors";

export const FindLinkItem = ({ ...props }) => {
  const { name } = props;
  const title: { [key: string]: string } = {
    trade: "Find Trade-Link",
    cs: "Find CS Codes",
  };
  const urls: { [key: string]: string } = {
    trade:
      "https://steamcommunity.com/id/s3x4/tradeoffers/privacy#trade_offer_access_url",
    cs: "https://help.steampowered.com/ru/wizard/HelpWithGameIssue/?appid=730&issueid=128",
  } as const;

  const handleURL = (url: string): void => {
    window.location.href = url;
  };

  return (
    <>
      <button
        onClick={() => handleURL(urls[name])}
        className={
          textColors.lightGray +
          "text-s mt-0.5 underline underline-offset-2 cursor-pointer"
        }
      >
        {title[name]}
      </button>
    </>
  );
};
