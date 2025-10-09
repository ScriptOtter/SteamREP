import { IComment } from "./IComment";
import { ISteamBans } from "./ISteamBans";
import { IUser } from "./IUser";

export interface ISteamUser {
  id: string;
  steamId2?: string;
  steamId3?: string;
  steamIdHex?: string;
  countryCode?: string;
  personaName?: string;
  profileUrl?: string;
  avatar?: string;
  realname?: string;
  level?: string;
  timeCreated?: string;
  userId?: string;
  commentsAsRecipient?: IComment[];
  user?: IUser | null;
  steamUserBans?: ISteamBans;
}
