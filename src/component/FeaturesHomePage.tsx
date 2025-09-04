import { FaSteam } from "react-icons/fa";
import { SiteFeature } from "./HomePage/SiteFeature";
import { Bookmark, EyeIcon, LucideRadar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const FeaturesHomePage = () => {
  const features = [
    {
      icon: <FaSteam size={36} />,

      title: "Steam Data",
      description:
        "Find out everything about the account, even the number of views",
    },
    {
      icon: <MessageSquare size={36} />,

      title: "Leave comments to users",
      description:
        "Leave comments to any Steam user, even if this Steam profile is hidden",
    },
    {
      icon: <EyeIcon size={36} />,

      title: "Overwatch CS2",
      description: "Watch and download CS2 demos to our system",
    },
    {
      icon: <LucideRadar size={36} />,

      title: "Track CS2 Statistics",
      description: "Collecting CS2 statistics in real time",
    },
    {
      icon: <Bookmark size={36} />,

      title: "Follow the players",
      description: "Pin players and track them in real time",
    },
  ];

  return (
    <div className="flex justify-center mt-4 mx-4 lg:mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div className={"p-4 fade-in-feature"}>
            <SiteFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
