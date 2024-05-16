import { useEffect, useState } from "react";
import { Team } from "../types";
import axios from "axios";

export const useFetchTeams = (url: string) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        if (!data.teams) {
          throw new Error("No team found for the team");
        }
        setTeams(data.teams);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      } finally {
        setLoading(false);
        console.log("Teams loading completed");
      }
    };

    void fetchTeams();
  }, [url]);

  return { teams, loading };
};
