import { ImageUp, Pencil, X } from "lucide-react";
import { Time } from "../data/time";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";
import { Loader } from "./Loader";
import { cn } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { IImage } from "@/models/IImage";

interface CommentProps {
  content: string;
  createdAt: string;
  commentId: string;
  updatedAt: string;
  role: string;
  username: string;
  avatar: string;
  steamid: string | undefined;
  pictureUrl: string | null;
  deteleComment: (commentId: string) => void;
  updateComment: (commentId: string, comment: string, imageUrl: string) => void;
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
  pictureUrl,
  deteleComment,
  updateComment,
}: CommentProps) => {
  const auth = useAuth();
  const [comment, newComment] = useState<string>(content);
  const [updating, setUpdating] = useState<boolean>(false);
  const [image, setImage] = useState<string>(pictureUrl ? pictureUrl : "");
  const [loading, setLoading] = useState<boolean>(false);
  const [deletedImage, setDeletedImage] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();
  console.log(
    "image ==",
    image.slice(0, 20),
    "UPDATE=",
    updating,
    "FILE=",
    file
  );
  const handleUpdate = async (commentId: string) => {
    setLoading(true);
    const formData = new FormData();
    console.log(formData);
    if (file && deletedImage) {
      formData.append("image", file);
      const res: AxiosResponse<IImage> = await axios.post(
        API_ENDPOINTS.uploadImage,
        formData,
        { withCredentials: true }
      );
      const imageUrl = res.data.filename;
      console.log("file uploaded,", imageUrl);
      await updateComment(commentId, comment, imageUrl);
    } else {
      await updateComment(commentId, comment, image);
    }

    setUpdating((prev) => !prev);

    setLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setFile(event.target.files?.[0]);
    if (file) {
      setImage(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById(
      "image-upload2"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Имитируем клик по input
    }
  };

  const visitProfile = () => {
    if (steamid !== undefined) navigate("/profile/" + steamid);
    else toast("Steam Profile not found!");
  };

  return (
    <div
      className={
        "w-full" +
        cn(
          !updating &&
            "duration-500 transition-all hover:outline-1 hover:outline-gray-200 rounded-lg hover:bg-gray-200/10"
        )
      }
    >
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
                      className="bg-orange-500 px-2 py-0.5 rounded-xl cursor-pointer text-white w-[121px] hover:bg-orange-700 transition-all transform hover:translate-y-[-2px] hover:shadow-md duration-300"
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
              {image && (
                <img
                  src={
                    (image.startsWith("data:") && image) ||
                    API_ENDPOINTS.API_URL + "static/" + image
                  }
                  alt="1"
                  className="w-[50%] mr-4"
                />
              )}
            </div>
            <div className="relative">
              <textarea
                hidden={!updating}
                className="text-white break-all w-full border-gray-300 outline-none transition-all duration-300 resize-none border-2 rounded-lg pl-4 px-4 py-3 h-32 focus:border-orange-400"
                defaultValue={comment}
                onChange={(e) => newComment(e.target.value)}
              ></textarea>
              {image && (
                <div
                  hidden={!updating}
                  className="flex justify-end space-x-1 items-center"
                >
                  <img
                    onClick={() => {
                      window.open(API_ENDPOINTS.API_URL + "static/" + image!);
                    }}
                    src={
                      (image.startsWith("data:") && image) ||
                      API_ENDPOINTS.API_URL + "static/" + image
                    }
                    alt="1"
                    className="w-[5%] rounded-lg cursor-pointer hover:blur-[0.5px]"
                  />
                  <p className="text-blue-200 text-xs">
                    {image.slice(0, 40) + "..." + image.slice(-7)}
                  </p>
                  <X
                    onClick={() => {
                      setImage("");
                      setFile(undefined);
                      setDeletedImage(true);
                    }}
                    size={18}
                    className="mt-1 text-white hover:text-orange-700 transition-all duration-300 cursor-pointer"
                  />
                </div>
              )}
              {image == "" && updating && (
                <div className="image-upload2">
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload2"
                  />
                  <button
                    onClick={handleButtonClick}
                    id="image-upload2"
                    className="text-white absolute top-1.5 right-1.5 cursor-pointer duration-300 hover:text-orange-400"
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
