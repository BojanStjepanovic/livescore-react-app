export interface MatchUI {
  match_id: number;
  home_team: TeamUI;
  away_team: TeamUI;
  event_type: MatchEventTypeUI;
}

export interface TeamUI {
  id: number;
  team_name: string;
  team_name_short: string;
  score_amount: number;
}

export type MatchEventTypeUI =
  | "home_team_score"
  | "away_team_score"
  | "match"
  | "pre_match"
  | "match_halftime"
  | "match_end";
