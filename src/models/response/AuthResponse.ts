import { IUser } from "../IUser";

export interface AuthResponse {
  SteamREP_accessToken: string;
  refreshToken: string;
  user: IUser;
}
