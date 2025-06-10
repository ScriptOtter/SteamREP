import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { ArrowUp } from "lucide-react";
import { Avatar } from "../../Avatar";
import { IDemos } from "@/models/IDemos";
import { Time } from "@/data/time";
import { VerdictMyReports } from "./VerdictMyReports";

export const MyReportsItem = ({
  id,
  youtubeLink,
  demoLink,
  comment,
  createdAt,
  author,
  recipient,
  verdicts,
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
              <h2 className="text-xl">
                {verdicts && Time(verdicts[0].createdAt)}
              </h2>
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
        <VerdictMyReports
          key={youtubeLink}
          id={id}
          youtubeLink={youtubeLink}
          demoLink={demoLink}
          comment={comment}
          createdAt={createdAt}
          author={author}
          recipient={recipient}
          verdicts={verdicts}
          reasonsReport={[]}
        />
      )}
    </>
  );
};
