import { FaShieldAlt, FaSteam } from "react-icons/fa";
import { SiteFeature } from "../components/HomePage/SiteFeature";
import { Bookmark, EyeIcon, LucideRadar, MessageSquare } from "lucide-react";

export const FeaturesHomePage = () => {
  const features = [
    {
      icon: <FaSteam className="text-light-blue" size={36} />,

      title: "Steam Data",
      description:
        "Find out everything about the account even the number of views",
    },
    {
      icon: <MessageSquare className="text-light-blue-3" size={36} />,

      title: "Leave comments to users",
      description:
        "Leave comments to any Steam user even if the Steam profile is hidden",
    },
    {
      icon: <FaShieldAlt className="text-red-600" size={36} />,

      title: "Tracking VAC",
      description:
        "All users in our database are checked daily for blocked accounts",
    },
    {
      icon: <LucideRadar className="text-yellow-500" size={36} />,

      title: "Track CS2 Statistics",
      description: "Collecting CS2 statistics in real time",
    },
    {
      icon: <EyeIcon className="text-orange-600" size={36} />,

      title: "Overwatch CS2",
      description: "Watch and upload CS2 demos into our system",
    },

    {
      icon: <Bookmark className="text-red-500" size={36} />,

      title: "Follow the players",
      description: "Pin players and track them in real time",
    },
  ];

  return (
    <div className="flex justify-center my-8 lg:mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  md:gap-4">
        {features.map((feature, index) => (
          <div
            className={
              "p-4 fade-in-feature duration-300 hover:-translate-y-[4px]"
            }
            key={index}
          >
            <div>
              <SiteFeature
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
