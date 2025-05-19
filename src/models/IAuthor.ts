import { ISteamUser } from "./ISteamUser";

export interface IAuthor {
  username: string;
  avatar: string;
  steamUser: ISteamUser;
}
