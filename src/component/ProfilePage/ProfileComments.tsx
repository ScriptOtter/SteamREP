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

export const ProfileComments = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const { id } = useParams<RouteParams>();

  const dispatch = useDispatch();
  const auth = useAuth();
  const api = createApi(dispatch);

  const renderComments = async () => {
    const comments = await getComments(id!);
    if (comments.toString() == "") {
      setError("No comments found.");
      setShowError(true);
      setLoading(false);
    } else {
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

  const updateComment = async (commentId: string, content: string) => {
    await api.patch(
      API_ENDPOINTS.commentDelete + commentId,
      { content: content },
      {
        withCredentials: true,
      }
    );
    renderComments();
  };

  useEffect(() => {
    renderComments();
    console.log(auth);
  }, []);

  return (
    <div>
      {auth.isAuth && <CommentTextArea renderComments={renderComments} />}
      {Array.isArray(comments) && !showError ? (
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
            deteleComment={toastDelete}
            updateComment={updateComment}
          />
        ))
      ) : (
        <div className="flex w-full text-white justify-center mt-16 text-2xl">
          {error}
        </div>
      )}
    </div>
  );
};
