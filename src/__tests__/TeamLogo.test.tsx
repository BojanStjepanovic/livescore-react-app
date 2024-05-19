import { render, screen } from "@testing-library/react";
import TeamLogo from "../components/TeamLogo.tsx";

jest.mock("../utils/get-team-logo", () => ({
  __esModule: true,
  default: async (teamId: number) => `/mock/path/logo_${teamId}.png`,
}));

describe("TeamLogo", () => {
  test("renders team logo", async () => {
    render(<TeamLogo teamId={1} />);
    const imgElement = await screen.findByRole("img");
    expect(imgElement).toHaveAttribute("src", "/mock/path/logo_1.png");
    expect(imgElement).toBeInTheDocument();
  });
});
