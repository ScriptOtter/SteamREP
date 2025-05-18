import { Time } from "../data/time";
import { IAuthor } from "../models/IAuthor";
import { IUser } from "../models/IUser";
import { API_AVATAR } from "../services/apiAvatar";

interface CommentProps {
  authorId: string;
  content: string;
  createdAt: string;
  key: string;
  updatedAt: string;
  username: string;
  avatar: string;
}
export const Comment = ({
  authorId,
  content,
  createdAt,
  updatedAt,
  username,
  avatar,
}: CommentProps) => {
  if (!avatar) avatar = API_AVATAR();
  const showUpdated = false;
  if (createdAt !== updatedAt) {
    const showUpdated = true;
  }
  return (
    <div className="bg-orange-300 rounded-2xl mx-2 my-1">
      <div className="flex">
        <div className="mr-2">
          <img
            src={avatar}
            className="inline-block h-12 w-12 rounded-full ring-1"
          ></img>
        </div>
        <div>
          <p className="text-xl text-white">
            {username} {!showUpdated && Time(updatedAt)}
          </p>
          <p className="">{content}</p>
        </div>
      </div>
    </div>
  );
};
