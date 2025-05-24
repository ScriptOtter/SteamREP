import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface ISteamUser {
  id?: string;
  personaName?: string;
  profileUrl?: string;
  avatar?: string;
  realname?: string;
  timeCreated?: string;
  userId?: string;
  commentsAsRecipient?: IComment[];
  user?: IUser | undefined;
}
