import { useEffect, useState } from "react";
import getTeamLogo from "../utils/get-team-logo.ts";

const TeamLogo = ({ teamId }: { teamId: number }) => {
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const loadLogo = async () => {
      const url = await getTeamLogo(teamId);
      setLogoUrl(url);
    };
    void loadLogo();
  }, [teamId]);

  if (!logoUrl) {
    return <div>Logo not available</div>;
  }

  return <img src={logoUrl} alt={`Team ${teamId} logo`} />;
};

export default TeamLogo;
