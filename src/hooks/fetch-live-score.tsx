import { useEffect, useRef, useState } from "react";
import { ApiResponse, MatchDayPhase, MatchEvent } from "../types";
import axios from "axios";
import { MatchesHelpers } from "../helpers/process-matches.helpers.ts";
import { MatchUI } from "../types/general-ui.types.ts";
import { useFetchTeams } from "./fetch-teams.tsx";

export const useFetch = (url: string) => {
  const { teams, loading } = useFetchTeams(url);
  const [matches, setMatches] = useState<MatchUI[]>([]);
  const [events, setEvents] = useState<MatchEvent[]>([]);

  const previousPhaseRef = useRef<MatchDayPhase | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const apiResponse: ApiResponse = response.data;

        const previousPhase = previousPhaseRef.current;
        const currentPhase = apiResponse.phase;

        console.log("Previous Phase: ", previousPhase);
        console.log("Current Phase: ", currentPhase);

        if (loading) {
          return;
        }

        if (!previousPhase || !matches.length) {
          setMatches(
            MatchesHelpers.initMatches(
              apiResponse.matches,
              teams,
              apiResponse.events,
            ),
          );
        } else if (previousPhase === "match" && currentPhase === "post_match") {
          setMatches((prevMatches) =>
            MatchesHelpers.updateMatchesStatus(prevMatches, "match_end"),
          );
        } else if (
          previousPhase === "post_match" &&
          currentPhase === "pre_match"
        ) {
          setMatches(
            MatchesHelpers.initMatches(
              apiResponse.matches,
              teams,
              apiResponse.events,
            ),
          );
          setEvents([]);
        } else if (currentPhase === "match") {
          const unprocessedEvents = MatchesHelpers.getUnProcessedEvents(
            events,
            apiResponse.events,
          );

          if (!unprocessedEvents.length) {
            return;
          }
          console.log("Unprocessed events  ", unprocessedEvents);

          setMatches((prevMatches) => {
            return MatchesHelpers.updateMatches(prevMatches, unprocessedEvents);
          });
          setEvents((prev) => {
            return [...prev, ...unprocessedEvents];
          });
        }

        previousPhaseRef.current = apiResponse.phase;
      } catch (error) {
        console.log(error);
      }
    };

    if (!loading) {
      void fetchData();
      const interval = setInterval(fetchData, 2000);
      return () => clearInterval(interval);
    }
  }, [url, teams, loading, events]);

  return { matches };
};
