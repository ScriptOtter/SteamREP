import { refreshToken } from "@/data/getUser";
import { RouteParams } from "@/pages/ProfilePage";
import { API_ENDPOINTS } from "@/services/apiService";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const CommentTextArea = () => {
  const [content, setContent] = useState<string>("");
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();

  const postComment = async () => {
    const res = await axios.post(
      API_ENDPOINTS.commentCreate + id,
      { content: content },
      { withCredentials: true }
    );
    if (res) alert("кайф!");
  };

  const hendlePost = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await postComment();
    } catch (e) {
      console.log(e);
      await refreshToken(dispatch);
      await postComment();
    }
  };

  return (
    <div className="mx-4 w-full max-w-lg p-6 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-lg  font-semibold mb-4">Leave comment</h2>
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="w-full h-32 p-4 border bg-blue-300 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ender your comment..."
      ></textarea>
      <button
        onClick={hendlePost}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};
