import { Match, MatchEvent, Team } from "../types";
import { MatchEventTypeUI, MatchUI } from "../types/general-ui.types.ts";

export class MatchesHelpers {
  static initMatches = (
    matches: Match[],
    teams: Team[],
    events: MatchEvent[],
  ): MatchUI[] => {
    const initMatches = matches
      .map((match) => {
        const homeTeam = teams.find(
          (team) => team.team_id === match.home_team_id,
        );
        const awayTeam = teams.find(
          (team) => team.team_id === match.away_team_id,
        );

        if (!homeTeam || !awayTeam) {
          return null;
        }

        return {
          match_id: match.match_id,
          home_team: {
            id: homeTeam.team_id,
            team_name: homeTeam.team_name,
            team_name_short: homeTeam.team_name_short,
            score_amount: 0,
          },
          away_team: {
            id: awayTeam.team_id,
            team_name: awayTeam.team_name,
            team_name_short: awayTeam.team_name_short,
            score_amount: 0,
          },
          event_type: "pre_match",
        } as MatchUI;
      })
      .filter((match): match is MatchUI => match !== null);

    return MatchesHelpers.updateMatches(initMatches, events);
  };

  static updateMatchesStatus = (
    matches: MatchUI[],
    status: MatchEventTypeUI,
  ): MatchUI[] => {
    return matches.map((match) => ({ ...match, event_type: status }));
  };

  static getUnProcessedEvents = (
    prevEvents: MatchEvent[],
    newEvents: MatchEvent[],
  ): MatchEvent[] => {
    const prevIds = new Set<number>(prevEvents.map(({ event_id }) => event_id));

    return newEvents.filter(({ event_id }) => !prevIds.has(event_id));
  };

  static updateMatches = (
    prevMatches: MatchUI[],
    events: MatchEvent[],
  ): MatchUI[] => {
    return prevMatches
      .map((match) => {
        const matchEvents = events.filter(
          ({ match_id }) => match_id === match.match_id,
        );

        if (!matchEvents.length) {
          return match;
        }

        let updatedMatch: MatchUI = { ...match };

        matchEvents.forEach((matchEvent) => {
          switch (matchEvent.event_type) {
            case "match_start":
              updatedMatch.event_type = "match";
              break;
            case "goal":
              if (matchEvent?.score_team === "home") {
                updatedMatch = {
                  ...updatedMatch,
                  event_type: "home_team_score",
                  home_team: {
                    ...updatedMatch.home_team,
                    score_amount: updatedMatch.home_team.score_amount + 1,
                  },
                };
              } else if (matchEvent?.score_team === "away") {
                updatedMatch = {
                  ...updatedMatch,
                  event_type: "away_team_score",
                  away_team: {
                    ...updatedMatch.home_team,
                    score_amount: updatedMatch.home_team.score_amount + 1,
                  },
                };
              }
              break;
            case "match_end":
              updatedMatch.event_type = "match_end";
              break;
            case "match_halftime":
              updatedMatch.event_type = "match_halftime";
          }
        });

        return updatedMatch;
      })
      .filter((match): match is MatchUI => match !== null);
  };
}
