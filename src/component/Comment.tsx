import { useState } from "react";
import { Time } from "../data/time";
import { API_AVATAR } from "../services/apiAvatar";

interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
  key: string;
  updatedAt: string;
  username: string;
  avatar: string;
}
export const Comment = ({
  author,
  content,
  createdAt,
  updatedAt,
  username,
  avatar,
}: CommentProps) => {
  if (!avatar) avatar = API_AVATAR();

  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{username}</h3>
          <div className="text-sm text-gray-500">
            <span>Posted: {Time(createdAt)}</span>
            {createdAt !== updatedAt && <span className="mx-2">|</span>}
            {createdAt !== updatedAt && <span>Updated: {Time(updatedAt)}</span>}
          </div>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};
