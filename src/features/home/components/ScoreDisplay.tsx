import { MatchEventTypeUI } from "../../../types/general-ui.types.ts";
import { animated, useSpring } from "@react-spring/web";

export const ScoreDisplay = ({
  away_score_amount,
  home_score_amount,
  event_type,
}: {
  away_score_amount: number;
  home_score_amount: number;
  event_type: MatchEventTypeUI;
}) => {
  const homeTeamScored = useSpring({
    color: event_type === "home_team_score" ? "red" : "white",
    from: { color: "white" },
    config: { duration: 2000 },
    loop: false,
    reset: true,
  });

  const awayTeamScored = useSpring({
    color: event_type === "away_team_score" ? "red" : "white",
    from: { color: "white" },
    config: { duration: 2000 },
    loop: false,
    reset: true,
  });

  const getBackgroundColor = () => {
    if (["match", "home_team_score", "away_team_score"].includes(event_type))
      return "bg-blue-500";

    if (event_type === "match_halftime") return "bg-blue-200";
    if (event_type === "match_end") return "bg-gray-500";
    return "bg-white";
  };
  return (
    <>
      <div
        className={`w-20 flex justify-center items-center ${getBackgroundColor()}`}
      >
        <animated.span style={homeTeamScored}>
          {home_score_amount}
        </animated.span>
        <span className="px-2">-</span>
        <animated.span style={awayTeamScored}>
          {away_score_amount}
        </animated.span>
      </div>
    </>
  );
};
