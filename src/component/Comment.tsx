import { Pencil, X } from "lucide-react";
import { Time } from "../data/time";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";
import { Loader } from "./Loader";

interface CommentProps {
  content: string;
  createdAt: string;
  commentId: string;
  updatedAt: string;
  role: string;
  username: string;
  avatar: string;
  steamid: string | undefined;
  deteleComment: (commentId: string) => void;
  updateComment: (commentId: string, comment: string) => void;
}
export const Comment = ({
  commentId,
  content,
  createdAt,
  updatedAt,
  role,
  username,
  avatar,
  steamid,
  deteleComment,
  updateComment,
}: CommentProps) => {
  const auth = useAuth();
  const [comment, newComment] = useState<string>(content);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdate = async (commentId: string) => {
    setLoading(true);
    await updateComment(commentId, comment);
    setUpdating((prev) => !prev);

    setLoading(false);
  };

  const visitProfile = () => {
    if (steamid !== undefined) navigate("/profile/" + steamid);
    else toast("Steam Profile not found!");
  };

  return (
    <div className="w-[100%]">
      <div className=" p-4 border-b border-gray-700">
        <div className="flex items-start">
          <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4 cursor-pointer"
            onClick={visitProfile}
          />

          <div className="w-full">
            <div className="flex justify-between items-center mb-2 ">
              <h3
                onClick={visitProfile}
                className="text-lg font-semibold cursor-pointer text-white flex items-center"
              >
                {username}
                {role === "VERIFIED_STEAM" && (
                  <MdVerified size={20} className="ml-1.5 text-blue-400" />
                )}
              </h3>

              <div className="text-sm text-white">
                <div className="flex items-center space-x-2">
                  {!updating ? (
                    <div>
                      <span>Posted: {Time(createdAt)}</span>
                      {createdAt !== updatedAt && (
                        <span className="mx-2">|</span>
                      )}
                      {createdAt !== updatedAt && (
                        <span>Updated: {Time(updatedAt)}</span>
                      )}
                    </div>
                  ) : (
                    <button
                      className="bg-orange-500 px-2 py-0.5 rounded-xl cursor-pointer "
                      onClick={() => handleUpdate(commentId)}
                    >
                      {!loading ? "Edit Comment" : <Loader />}
                    </button>
                  )}
                  {auth.username === username && (
                    <>
                      <Pencil
                        size={12}
                        onClick={() => setUpdating((prev) => !prev)}
                        className="cursor-pointer hover:text-orange-500"
                      />
                      <X
                        size={14}
                        onClick={() => {
                          deteleComment(commentId);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div hidden={updating} className="text-white break-all max-w-full">
              {comment}
            </div>
            <textarea
              hidden={!updating}
              className="text-white break-all w-full border-orange-500 border-1 rounded-s"
              defaultValue={comment}
              onChange={(e) => newComment(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
