import { ImageUp, Pencil, X } from "lucide-react";
import { Time } from "../data/time";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { Loader } from "./Loader";
import { cn } from "@/lib/utils";
import { IImages } from "@/models/IImages";
import { UseUploadFile } from "@/hooks/use-upload-file";
import { UploadedImage } from "./Comment/UploadedImage";
import { CommentImages } from "./Comment/CommentImages";
import { ToastWarning } from "./Toasts/ToastWarning";

interface CommentProps {
  content: string;
  createdAt: string;
  commentId: string;
  updatedAt: string;
  role: string;
  username: string;
  avatar: string;
  steamid: string | undefined;
  images?: IImages[];
  deteleComment: (commentId: string) => void;
  renderComments: () => void;
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
  images,
  deteleComment,
  renderComments,
}: CommentProps) => {
  const auth = useAuth();
  const [comment, newComment] = useState<string>(content);
  const [updating, setUpdating] = useState<boolean>(false);
  const [commentImages, setCommentImages] = useState<IImages[]>(images || []);
  console.log("commentImages=", commentImages);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const deteleImage = (image: string) => {
    const prevImages = commentImages.filter((i) => {
      return i.id != image;
    });
    setCommentImages(prevImages || []);
    setDeletedImages((prevDeleted) => [...prevDeleted, image]);
  };
  const type = "update";
  const {
    files,
    handleButtonClick,
    handleFileChange,
    deleteUploadedImage,
    updateComment,
    loading,
  } = UseUploadFile(type, comment, renderComments);

  const navigate = useNavigate();

  const visitProfile = () => {
    if (steamid !== undefined) navigate("/profile/" + steamid);
    else ToastWarning("Steam Profile not found!");
  };

  return (
    <div
      className={cn(
        !updating &&
          "w-full duration-300 transition-all hover:outline-light-gray rounded-md hover:bg-gray-200/10"
      )}
    >
      <div className="p-4 border-t border-gray-700">
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
                    <>
                      <div className="hidden md:flex md:visible">
                        <span>Posted: {Time(createdAt)}</span>
                        {createdAt !== updatedAt && (
                          <span className="mx-2">|</span>
                        )}
                        {createdAt !== updatedAt && (
                          <span>Updated: {Time(updatedAt)}</span>
                        )}
                      </div>
                      <div className="flex md:hidden">
                        {createdAt == updatedAt ? (
                          <span>Posted: {Time(createdAt)}</span>
                        ) : (
                          <span>Updated: {Time(updatedAt)}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <button
                      className="bg-light-blue px-2 py-0.5 rounded-xl cursor-pointer text-white w-[121px] hover:bg-light-blue-2 transition-all transform hover:translate-y-[-2px] hover:shadow-md duration-300"
                      onClick={() => {
                        updateComment(
                          commentId,
                          comment,
                          deletedImages,
                          commentImages
                        );
                        setUpdating(false);
                        renderComments();
                      }}
                    >
                      {!loading ? "Edit Comment" : <Loader />}
                    </button>
                  )}
                  {auth.username === username && (
                    <div className="flex justify-center items-center space-x-2">
                      <Pencil
                        size={12}
                        onClick={() => setUpdating((prev) => !prev)}
                        className="cursor-pointer hover:text-light-blue"
                      />
                      <X
                        size={16}
                        onClick={() => {
                          deteleComment(commentId);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                hidden={!updating}
                className="text-white break-all w-full border-gray-300 outline-none transition-all duration-200 resize-none border-2 rounded-lg pl-4 px-4 py-3 focus:h-32 h-13 focus:border-light-blue"
                defaultValue={comment}
                onChange={(e) => newComment(e.target.value)}
              ></textarea>

              <div
                hidden={updating}
                className="text-white break-all max-w-full"
              >
                {comment}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commentImages.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-lg shadow-lg"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full object-cover transition-transform duration-300 transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn(!updating && "hidden")}>
                {commentImages &&
                  commentImages.map((image, index) => (
                    <CommentImages
                      key={index}
                      image={image}
                      deteleImage={deteleImage}
                    />
                  ))}
              </div>
              <div className={cn(!updating && "hidden")}>
                {files &&
                  files.map((file) => (
                    <>
                      <UploadedImage
                        key={file.name}
                        file={file}
                        deleteUploadedImage={deleteUploadedImage}
                      />
                    </>
                  ))}
              </div>
              {updating && (
                <div className={type}>
                  <input
                    type="file"
                    multiple
                    name="image"
                    accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id={type}
                  />
                  <button
                    onClick={handleButtonClick}
                    id={type}
                    className="text-white absolute top-1.5 right-1.5 cursor-pointer duration-300 hover:text-light-blue"
                  >
                    <ImageUp size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
