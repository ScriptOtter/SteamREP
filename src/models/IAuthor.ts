import { ISteamUser } from "./ISteamUser";

export interface IAuthor {
  username: string;
  avatar: string;
  role: string;
  steamUser: ISteamUser;
}
