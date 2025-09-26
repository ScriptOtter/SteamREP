import { IComment } from "@/models/IComment";
import { Comment } from "../Comment";
import { useAuth } from "@/hooks/use-auth";
import { CommentTextArea } from "../CommentTextArea";
import { getComments } from "@/data/getComments";
import { useEffect, useState } from "react";
import { RouteParams } from "@/pages/ProfilePage";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { useDispatch } from "react-redux";
import { PageLoader } from "../Loader";

export const ProfileComments = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const auth = useAuth();
  const api = createApi(dispatch);

  const renderComments = async () => {
    setLoading(true);
    setFirstLoad(true);
    const comments = await getComments(id!);
    if (comments.toString() == "") {
      if (auth.isAuth) setError("Leave the first comment");
      else setError("You must be logged in to leave a comment");
      setShowError(true);
      setLoading(false);
    } else {
      setShowError(false);
      setComments(comments);
      setLoading(false);
    }
  };

  const toastDelete = async (commentsId: string) => {
    toast.warning(
      <button
        onClick={async () => {
          await deteleComment(commentsId);
        }}
        className="cursor-pointer underline underline-offset-2"
      >
        Сonfirm delete action
      </button>,
      { theme: "dark" }
    );
  };
  const deteleComment = async (commentId: string) => {
    await api.delete(API_ENDPOINTS.commentDelete + commentId, {
      withCredentials: true,
    });

    renderComments();
  };

  useEffect(() => {
    renderComments();
    console.log(auth);
  }, []);

  useEffect(() => {
    setLoading(true);
    renderComments();
  }, [location.pathname]);

  return (
    <div>
      {loading && !firstLoad && <PageLoader />}
      {auth.isAuth && !loading && (
        <CommentTextArea renderComments={renderComments} />
      )}
      {!showError && !loading ? (
        comments?.map((comment: IComment) => (
          <Comment
            commentId={comment.id}
            key={comment?.id}
            content={comment?.content}
            createdAt={comment?.createdAt}
            updatedAt={comment?.updatedAt}
            role={comment?.author?.role}
            username={
              comment?.author?.steamUser?.personaName ||
              comment?.author.username
            }
            avatar={
              comment?.author?.steamUser?.avatar || comment?.author?.avatar
            }
            steamid={comment?.author?.steamUser?.id}
            images={comment?.images}
            deteleComment={toastDelete}
            renderComments={renderComments}
          />
        ))
      ) : (
        <div className="flex w-full justify-center py-8 items-center">
          <p className="text-white text-2xl">{error}</p>
        </div>
      )}
    </div>
  );
};
