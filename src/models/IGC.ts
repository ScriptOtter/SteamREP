export interface IGC {
  commendation: {
    cmd_friendly: number | null;
    cmd_teaching: number | null;
    cmd_leader: number | null;
  };
  medals: {
    display_items_defidx: number[] | null;
  };
  player_level: number | null;
  player_cur_xp: number | null;
  player_xp_bonus_flags: number | null;
}
