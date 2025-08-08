import { IAuthor } from "./IAuthor";
import { ISteamUser } from "./ISteamUser";

export interface IComment {
  id: string;
  content: string;
  recipientId: string;
  createdAt: string;
  updatedAt: string;
  pictureUrl: string;
  author: IAuthor;
  steamUser: ISteamUser;
}
