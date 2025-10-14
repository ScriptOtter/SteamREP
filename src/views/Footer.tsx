import { FaIcons, FaSteam, FaTelegram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-secondary border-t-1 border-light-gray text-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="font-semibold mb-3">Follow Us!</h2>
          <div className="flex justify-center space-x-4">
            <FaSteam size={24} />
            <FaTelegram size={24} />
            <FaIcons size={24} />
          </div>
        </div>
        <div className="mb-3">
          <p className="text-white text-center">
            &copy; 2025 SteamRep Help. All rights reserved.
          </p>
          <p className="text-xs text-center text-light-gray-3">
            steamrep.help is an online service for CS2 stat tracking and Steam
            reputation. Time to start tracking your competitive CS2 match
            history.
          </p>
        </div>
        <nav className="mb-6 text-sm text-center text-light-blue-3">
          <a
            onClick={() => navigate("/terms-of-use")}
            className="mx-4 hover:text-light-blue-2 cursor-pointer"
          >
            Terms of Use
          </a>
          <a
            onClick={() => navigate("/privacy-policy")}
            className="mx-4 hover:text-light-blue-2 cursor-pointer"
          >
            Privacy Policy
          </a>
          <a
            onClick={() => navigate("/privacy-settings")}
            className="mx-4 hover:text-light-blue-2 cursor-pointer"
          >
            Privacy Settings
          </a>
        </nav>
        <div className="mb-6 text-xs flex justify-center space-x-1">
          <p>For feedback contact me: </p>
          <p
            onClick={() => (location.href = "https://t.me/s3x4ct")}
            className="text-light-blue-3 hover:text-light-blue-2 cursor-pointer"
          >
            t.me/s3x4ct
          </p>
        </div>
        <div className="flex justify-center space-x-1">
          <p className="text-xs text-white">Powered by Steam.</p>
          <p className="text-xs text-light-gray-3">
            This site is not affiliated with Valve.
          </p>
        </div>
      </div>
    </footer>
  );
};
