import { useDropDownMenu } from "@/hooks/use-drop-down-menu";

import { VerdictOverwatchDemos } from "./VerdictOverwatchDemos";
import { ArrowUp } from "lucide-react";
import { Avatar } from "../../../components/Avatar";
import { IDemos } from "@/models/IDemos";
import { Time } from "@/data/time";

export const OverwatchItem = ({
  id,
  youtubeLink,
  demoLink,
  comment,
  createdAt,
  author,
  recipient,
  updateDemos,
}: IDemos) => {
  const { isMenuOpen, toggleMenu } = useDropDownMenu();

  return (
    <>
      <div
        onClick={toggleMenu}
        className="flex flex-col md:flex-row bg-[#282a2e] rounded-xl px-4 py-4 mb-2 cursor-pointer"
      >
        {!isMenuOpen && (
          <>
            <div className="flex items-center flex-1 text-white cursor-pointer">
              <Avatar src={author.steamUser.avatar || ""} />
              <h2 className="text-xl ml-2">{author.steamUser.personaName}</h2>
            </div>
            <div className="flex items-center flex-1 text-white cursor-pointer">
              <Avatar src={recipient.avatar || ""} />
              <h2 className="text-xl ml-2">{recipient.personaName}</h2>
            </div>
            <div className="flex-1 text-white cursor-pointer">
              <h2 className="text-xl">{Time(createdAt)}</h2>
            </div>
          </>
        )}
        {isMenuOpen && (
          <p className="text-white text-xl items-center">
            <ArrowUp />
          </p>
        )}
      </div>

      {isMenuOpen && (
        <VerdictOverwatchDemos
          key={youtubeLink}
          id={id}
          youtubeLink={youtubeLink}
          demoLink={demoLink}
          comment={comment}
          createdAt={createdAt}
          author={author}
          recipient={recipient}
          reasonsReport={[]}
          updateDemos={updateDemos}
        />
      )}
    </>
  );
};
