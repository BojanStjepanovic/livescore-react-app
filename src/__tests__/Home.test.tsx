import { render, screen } from "@testing-library/react";
import { Home } from "../features";

jest.mock("../utils/get-team-logo", () => ({
  __esModule: true,
  default: async (teamId: number) => `/mock/path/logo_${teamId}.png`,
}));

jest.mock("../hooks", () => ({
  useFetch: jest.fn(() => ({
    matches: [
      {
        match_id: 1,
        home_team: { id: 1, team_name_short: "HT", score_amount: 2 },
        away_team: { id: 2, team_name_short: "AT", score_amount: 1 },
      },
      {
        match_id: 2,
        home_team: { id: 3, team_name_short: "HT2", score_amount: 3 },
        away_team: { id: 4, team_name_short: "AT2", score_amount: 2 },
      },
    ],
  })),
}));

// Mock the Match component
jest.mock("../features/home/components/Match/Match.tsx", () => ({
  Match: ({ match }: { match: any }) => (
    <div>
      <span>
        {match.home_team.team_name_short} vs {match.away_team.team_name_short}
      </span>
    </div>
  ),
}));

test("renders matches when they are available", () => {
  render(<Home />);

  expect(screen.getByText("HT vs AT")).toBeInTheDocument();
  expect(screen.getByText("HT2 vs AT2")).toBeInTheDocument();
});
