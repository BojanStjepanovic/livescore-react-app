import { useFetch } from "../../../hooks";
import { API_URL } from "../../../general.consants.ts";
import { Match } from "./Match.tsx";

export const Home = () => {
  const { matches } = useFetch(API_URL);

  return (
    <>
      {matches.length > 0 ? (
        matches.map((match) => <Match match={match} key={match.match_id} />)
      ) : (
        <p>No matches available</p>
      )}
    </>
  );
};
