import { Time } from "../data/time";
import { API_AVATAR } from "../services/apiAvatar";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentProps {
  content: string;
  createdAt: string;
  key: string;
  updatedAt: string;
  username: string;
  avatar: string;
  loading: boolean;
}
export const Comment = ({
  content,
  createdAt,
  updatedAt,
  username,
  avatar,
  loading,
}: CommentProps) => {
  if (!avatar) avatar = API_AVATAR();

  return (
    <>
      {loading && <Skeleton className="w-[250px] h-[250px]" />}
      <div className="flex items-start p-4 border-b border-gray-700">
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{username}</h3>

            <div className="text-sm text-white">
              <span>Posted: {Time(createdAt)}</span>
              {createdAt !== updatedAt && <span className="mx-2">|</span>}
              {createdAt !== updatedAt && (
                <span>Updated: {Time(updatedAt)}</span>
              )}
            </div>
          </div>
          <p className="text-white">{content}</p>
        </div>
      </div>
    </>
  );
};
