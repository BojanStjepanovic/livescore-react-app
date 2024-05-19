import { render } from "@testing-library/react";
import App from "../App.tsx";

jest.mock("../utils/get-team-logo", () => ({
  __esModule: true,
  default: async (teamId: number) => `/mock/path/logo_${teamId}.png`,
}));

describe("Home component", () => {
  it("renders the counter component", () => {
    render(<App />);
  });
});
