import { MatchUI } from "../../../../types/general-ui.types.ts";
import TeamLogo from "../../../../components/TeamLogo.tsx";
import { ScoreDisplay } from "../ScoreDisplay/ScoreDisplay.tsx";

export const Match = ({ match }: { match: MatchUI }) => {
  return (
    <>
      <div
        key={match.match_id}
        className="flex justify-between items-center border-b last:border-0 my-1 py-1 px-2 "
      >
        <div className="flex items-center">
          <span className="px-2 min-w-16 text-black">
            {match.home_team.team_name_short}
          </span>
          <TeamLogo teamId={match.home_team.id} />
        </div>
        <ScoreDisplay
          key={match.match_id}
          home_score_amount={match.home_team.score_amount}
          away_score_amount={match.away_team.score_amount}
          event_type={match.event_type}
        />
        <div className="flex items-center">
          <TeamLogo teamId={match.away_team.id} />
          <span className="px-2 min-w-16 text-black">
            {match.away_team.team_name_short}
          </span>
        </div>
      </div>
    </>
  );
};
