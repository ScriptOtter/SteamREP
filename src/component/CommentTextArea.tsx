import { API_ENDPOINTS } from "@/services/apiService";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface IComment {
  hendlePost: () => void;
}

export const CommentTextArea = () => {
  const { id } = useParams<RouteParams>();
  const hendlePost = async (event: React.FormEvent, id: string) => {
    event.preventDefault();

    console.log(id);
    console.log(API_ENDPOINTS.commentCreate);
    const res = await axios.post(
      API_ENDPOINTS.commentCreate + id,
      { content: content },
      {
        withCredentials: true,
      }
    );
    console.log(res);
  };
  const [content, setContent] = useState<string>("");
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
        onClick={() => {
          hendlePost(event, id);
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};
