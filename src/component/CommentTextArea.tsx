import { useAuth } from "@/hooks/use-auth";
import { RouteParams } from "@/pages/ProfilePage";
import { ImageUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { UploadedImage } from "./Comment/UploadedImage";
import { UseUploadFile } from "@/hooks/use-upload-file";

interface Props {
  renderComments: () => void;
}

export const CommentTextArea = ({ renderComments }: Props) => {
  const [comment, setComment] = useState<string>("");
  const auth = useAuth();
  const { id } = useParams<RouteParams>();
  const type = "create";
  const {
    files,
    handleButtonClick,
    handleFileChange,
    deleteUploadedImage,
    sendComment,
    loading,
  } = UseUploadFile(type, comment, renderComments);

  return (
    <>
      <div hidden={!auth.id} className="w-full">
        <div className="p-4 border-light-gray">
          <div className="flex items-start">
            <img
              src={auth.avatar!}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-4 cursor-pointer"
            />

            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold cursor-pointer text-white">
                  {auth.username}
                </h3>
                <button
                  className="bg-light-blue px-2 rounded-xl cursor-pointer text-white  hover:bg-light-blue-2 transition-all transform hover:translate-y-[-2px] hover:shadow-md duration-100"
                  onClick={() => {
                    sendComment(id!);
                    setComment("");
                  }}
                >
                  {!loading ? "Post Comment" : <Loader />}
                </button>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Enter your comment..."
                  className="text-white break-all w-full border-gray-300 outline-none transition-all duration-200 resize-none border-2 rounded-lg pl-4 px-4 py-3 focus:h-32 h-13 focus:border-light-blue"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

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
                    className="text-white absolute top-1.5 right-1.5 cursor-pointer duration-100 hover:text-light-blue-2"
                  >
                    <ImageUp size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
