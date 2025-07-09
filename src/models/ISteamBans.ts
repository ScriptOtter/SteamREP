export interface ISteamBans {
  id?: string;
  steam?: string;
  communityBanned?: boolean;
  daysSinceLastBan?: number;
  economyBan?: string;
  gameBans?: number;
  vacBanned?: boolean;
  vacBans?: number;
}
