import { IAuthor } from "./IAuthor";
import { IImages } from "./IImages";
import { ISteamUser } from "./ISteamUser";

export interface IComment {
  id: string;
  content: string;
  recipientId: string;
  createdAt: string;
  updatedAt: string;
  images?: IImages[];
  author: IAuthor;
  steamUser: ISteamUser;
}
