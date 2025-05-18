import { IAuthor } from "./IAuthor";

export interface IComment {
  id: string;
  content: string;
  authorId: string;
  recipientId: string;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
}
