import { IComment } from "./IComment";
import { ISteamUser } from "./ISteamUser";

export interface IUser {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
  createdAt: string;
  steamUser?: ISteamUser;
  commentsAsRecipient: IComment[];
}
