import { ExternalLink } from "lucide-react";
import {
  FaDiscord,
  FaSteam,
  FaTelegramPlane,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";

export const SocialLinks = () => {
  return (
    <>
      <p className="text-white text-center md:text-left text-xl">
        Social Links:
      </p>
      <div className="flex flex-col items-center md:items-start text-center md:text-left text-s text-bold text-white">
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#82d5ff]">
          <FaTelegramPlane className="mt-1.5 text-[#0088cc]" />
          <p className=" mt-1">Telegram </p>
          <ExternalLink size={14} className="mt-1.5" />
        </div>
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#a66fff]">
          <FaTwitch className="mt-1.5 text-[#6441A5]" />
          <p className=" mt-1">Twitch </p>
          <ExternalLink size={14} className="mt-1.5" />
        </div>
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#ff7470]">
          <FaYoutube className="mt-1.5 text-[#c4302b]" />
          <p className=" mt-1">Youtube</p>{" "}
          <ExternalLink size={14} className="mt-1.5" />
        </div>
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#768fe7]">
          <FaDiscord className="mt-1.5 text-[#7289da]" />
          <p className=" mt-1">Discord</p>
          <ExternalLink size={14} className="mt-1.5" />
        </div>
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#72cdee]">
          <FaSteam className="mt-1.5 text-[#00adee]" />
          <p className=" mt-1">Trade URL</p>
          <ExternalLink size={14} className="mt-1.5" />
        </div>
      </div>
    </>
  );
};
