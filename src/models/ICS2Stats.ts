export interface ICS2Stats {
  faceit: number | null;
  faceit_elo: number | null;
  premier: number | null;
  wingman: number | null;
  wingmanMathes: number | null;
  wingmanWins: number | null;
  TotalMatches: number | null;
  wins: number | null;
  inGameSinse: string | null;
  updatedAt: Date;
  MapRanks: MapRank[];
  WeaponStats: IWeaponStats[];
  steam: {
    steamUserBans: {
      csBan: boolean;
      cs_banned_since: Date | null;
    };
  };
}
export interface IWeaponStats {
  id: string;
  name: string;
  fire: number;
  hits: IHits[];
}
export interface IHits {
  hitLocation: string;
  hits: number;
  id: string;
  kills: number;
  totalDamage: number;
}
interface MapRank {
  name: string | null;
  rank: number | null;
  updatedAt: Date;
}
