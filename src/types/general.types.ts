export type MatchType = "match_start" | "match_end" | "match_halftime" | "goal";

export interface Team {
  team_id: number;
  team_name: string;
  team_name_short: string;
}

export interface Match {
  match_id: number;
  tournament_id: number;
  round: number;
  home_team_id: number;
  away_team_id: number;
}

export interface MatchEvent {
  event_id: number;
  event_type: MatchType;
  event_time: number;
  match_id: number;
  //score_amount and score_team are available only if type of event is 'goal'
  score_amount?: number;
  score_team?: "away" | "home";
}

export interface ApiResponse {
  phase: MatchDayPhase; //Events are only filled during the match. phase = 'match'
  teams: Team[];
  matches: Match[];
  events: MatchEvent[];
}

export type MatchDayPhase = "pre_match" | "match" | "post_match";
