import { useAuth } from "@/hooks/use-auth";
import { RouteParams } from "@/pages/ProfilePage";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ImageUp, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { IImage } from "@/models/IImage";

interface Props {
  renderComments: () => void;
}

export const CommentTextArea = ({ renderComments }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [visibleArea, setVisibleArea] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const [file, setFile] = useState<File>();

  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const auth = useAuth();

  const handlePost = async (id: string) => {
    setLoading(true);
    const formData = new FormData();
    console.log(formData);
    if (file) {
      formData.append("image", file);
      const res: AxiosResponse<IImage> = await axios.post(
        API_ENDPOINTS.uploadImage,
        formData,
        { withCredentials: true }
      );
      const imageUrl = res.data.filename;
      console.log("file uploaded,", imageUrl);
      await postComment(id, imageUrl);
    } else {
      await postComment(id, "");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    if (file) {
      setFile(event.target.files?.[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Имитируем клик по input
    }
  };

  const postComment = async (id: string, imageUrl: string) => {
    if (comment === "" || comment.trimStart() == "") {
      toast.warning("Comment is empty!", { theme: "dark" });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      if (imageUrl == "") {
        const res = await api.post(
          API_ENDPOINTS.commentCreate + id,
          { content: comment },
          { withCredentials: true }
        );
        if (res) {
          console.log("RES PRISHOL");
          setComment("");
          setVisibleArea(false);
          setImage("");

          renderComments();
          setLoading(false);
        }
      } else {
        const res = await api.post(
          API_ENDPOINTS.commentCreate + id,
          { content: comment, pictureUrl: imageUrl },
          { withCredentials: true }
        );
        if (res) {
          console.log("RES PRISHOL");
          setComment("");
          setVisibleArea(false);
          setImage("");

          renderComments();
          setLoading(false);
        }
      }
    } catch (e: unknown) {
      setLoading(false);
      if (e instanceof AxiosError) {
        if (e.response?.data.message !== "Unauthorized")
          toast.warning(e.response?.data.message, { theme: "dark" });
      }
    }
  };

  return (
    <>
      <div hidden={!auth.id} className="w-[100%]">
        <div className=" p-4 border-b border-gray-700">
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
                  className="bg-orange-500 px-2 rounded-xl cursor-pointer text-white w-[121px] hover:bg-orange-700 transition-all transform hover:translate-y-[-2px] hover:shadow-md duration-300"
                  onClick={() => handlePost(id!)}
                >
                  {!loading ? "Post Comment" : <Loader />}
                </button>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Enter your comment..."
                  className="text-white break-all w-full border-gray-300 outline-none transition-all duration-300 resize-none border-2 rounded-lg pl-4 px-4 py-3 focus:h-32 h-13 focus:border-orange-400"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                {image && (
                  <div className="flex justify-end space-x-1 items-center">
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
                      onClick={() => setImage("")}
                      size={18}
                      className="mt-1 text-white hover:text-orange-700 transition-all duration-300 cursor-pointer"
                    />
                  </div>
                )}
                {image == "" && (
                  <div className="image-upload">
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <button
                      onClick={handleButtonClick}
                      id="image-upload"
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
    </>
  );
};
