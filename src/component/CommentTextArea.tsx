import { Skeleton } from "@/components/ui/skeleton";
import { refreshToken } from "@/data/getUser";
import { useAuth } from "@/hooks/use-auth";
import { RouteParams } from "@/pages/ProfilePage";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  loading: boolean;
  hendlePost: (res: any) => void;
}

export const CommentTextArea = ({ loading, hendlePost }: Props) => {
  const [comment, setComment] = useState<string>("");
  const [visibleArea, setVisibleArea] = useState<boolean>(false);

  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const api = createApi(dispatch);
  const auth = useAuth();

  const postComment = async (id: string) => {
    if (comment === "") {
      toast.warning("Comment is empty!", { theme: "dark" });
      return;
    }
    setComment("");
    try {
      const res = await api.post(
        API_ENDPOINTS.commentCreate + id,
        { content: comment },
        { withCredentials: true }
      );
      if (res) {
        setComment("");
        setVisibleArea(false);
        hendlePost(res.data);
        return;
      }
      return undefined;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message !== "Unauthorized")
          toast.warning(e.response?.data.message, { theme: "dark" });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="mx-4 my-4 text-2xl text-white">Comments:</p>
        <Plus
          size={32}
          className="text-white mr-2 hover:text-orange-500 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setVisibleArea(!visibleArea);
          }}
        />
      </div>

      <div hidden={!visibleArea} className="w-[100%]">
        {loading && <Skeleton className="w-[250px] h-[250px]" />}
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
                  className="bg-orange-500 px-2 rounded-xl cursor-pointer text-white"
                  onClick={() => postComment(id!)}
                >
                  Post Comment
                </button>
              </div>

              <textarea
                className="text-white break-all w-full border-orange-500 border-1 rounded-s"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
