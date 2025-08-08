import { getSocialLinks } from "@/data/socialLinks";
import { ISocialLinks } from "@/models/ISocialLinks";
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaSteam,
  FaTelegramPlane,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

export const SocialLinks = ({ ...props }) => {
  const [socialLinks, setSocialLinks] = useState<ISocialLinks>();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { id } = props;
  const fetchData = async () => {
    const links = await getSocialLinks(dispatch, id!);
    console.log();
    if (links) setSocialLinks(links);
    setLoading(false);
    console.log(socialLinks);
  };
  useEffect(() => {
    fetchData();
  }, [location.pathname]);

  return (
    <>
      {!loading && socialLinks && (
        <div>
          <p className="text-white text-center md:text-left text-xl">
            Social Links:
          </p>

          <div className="flex flex-col items-center md:items-start text-center md:text-left text-s text-bold text-white">
            {socialLinks?.telegram && (
              <div
                onClick={() => {
                  window.location.href = socialLinks.telegram;
                }}
                className="flex items-center space-x-1.5 cursor-pointer hover:text-[#82d5ff] transition-all transform hover:translate-y-[-1px] hover:shadow-xs duration-300"
              >
                <FaTelegramPlane className="mt-1.5 text-[#0088cc]" />

                <p className=" mt-1">Telegram </p>

                <ExternalLink
                  onClick={() => {
                    window.location.href = socialLinks.telegram;
                  }}
                  size={14}
                  className="mt-1.5"
                />
              </div>
            )}
            {socialLinks?.twitch && (
              <div
                onClick={() => {
                  window.location.href = socialLinks.twitch;
                }}
                className="flex items-center space-x-1.5 cursor-pointer hover:text-[#a66fff] transition-all transform hover:translate-y-[-1px] hover:shadow-xs duration-300"
              >
                <FaTwitch className="mt-1.5 text-[#6441A5]" />
                <p className=" mt-1">Twitch </p>
                <ExternalLink
                  onClick={() => {
                    window.location.href = socialLinks.twitch;
                  }}
                  size={14}
                  className="mt-1.5"
                />
              </div>
            )}
            {socialLinks?.youtube && (
              <div
                onClick={() => {
                  window.location.href = socialLinks.youtube;
                }}
                className="flex items-center space-x-1.5 cursor-pointer hover:text-[#ff7470] transition-all transform hover:translate-y-[-1px] hover:shadow-xs duration-300"
              >
                <FaYoutube className="mt-1.5 text-[#c4302b]" />
                <p className=" mt-1">Youtube</p>
                <ExternalLink
                  onClick={() => {
                    window.location.href = socialLinks.youtube;
                  }}
                  size={14}
                  className="mt-1.5"
                />
              </div>
            )}

            {socialLinks?.tradeLink && (
              <div
                onClick={() => {
                  window.location.href = socialLinks.tradeLink;
                }}
                className="flex items-center space-x-1.5 cursor-pointer hover:text-[#72cdee] transition-all transform hover:translate-y-[-1px] hover:shadow-xs duration-300"
              >
                <FaSteam className="mt-1.5 text-[#00adee]" />
                <p className=" mt-1">Trade URL</p>
                <ExternalLink
                  onClick={() => {
                    window.location.href = socialLinks.tradeLink;
                  }}
                  size={14}
                  className="mt-1.5"
                />
              </div>
            )}
            {socialLinks?.discord && (
              <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#768fe7] transition-all transform hover:translate-y-[-1px] hover:shadow-xs duration-300">
                <FaDiscord className="mt-1.5 text-[#7289da]" />
                <p
                  onClick={() =>
                    navigator.clipboard.writeText(socialLinks.discord)
                  }
                  className=" mt-1"
                >
                  {socialLinks.discord}
                </p>
                <Copy
                  onClick={() =>
                    navigator.clipboard.writeText(socialLinks.discord)
                  }
                  size={13}
                  className="mt-1.5"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
