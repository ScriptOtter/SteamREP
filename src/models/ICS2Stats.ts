export interface ICS2Stats {
  faceit: number | null;
  faceit_elo: number | null;
  premier: number | null;
  wingman: number | null;
  TotalMatches: number | null;
  winrate: number | null;
  inGameSinse: string | null;
  updatedAt: Date;
  MapRanks: MapRank[];
  WeaponStats: [];
  steam: {
    steamUserBans: {
      csBan: boolean;
      cs_banned_since: Date | null;
    };
  };
}

interface MapRank {
  name: string | null;
  rank: number | null;
  updatedAt: Date;
}
