import { IMatches } from "@/components/CS2MatchesPage/CS2Matches";
import { MatchInformation } from "@/components/Match/MatchInformation";

import { MatchResultWithImg } from "@/components/Match/MatchResultWithImg";

import { API_ENDPOINTS } from "@/services/apiService";
import { Header } from "@/views/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteParams } from "./ProfilePage";
import { PageLoader } from "@/components/Loader";

export const MatchPage = () => {
  const [match, setMatch] = useState<IMatches>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const { id } = useParams<RouteParams>();
  useEffect(() => {
    const fetchMatch = async () => {
      const res = await axios.get(API_ENDPOINTS.getMatch + id);
      if (res.data) {
        setMatch(res.data);
        setLoading(false);
      } else {
        setError("Match not found");
        setLoading(false);
      }
    };
    fetchMatch();
  }, []);
  console.log(match);
  return (
    <>
      <Header />
      {loading && <PageLoader />}
      {!loading && match ? (
        <>
          <MatchInformation match={match} />
          <MatchResultWithImg
            map={match.map}
            teams={match.playersStatistic}
            participants={match.participants}
          />

          {/* <div className="flex justify-center mt-6">
            <Container className="text-white">
              <MatchPlayersStats teamName={"A"} matchResult={1} team={team1} />
              <MatchPlayersStats teamName={"B"} matchResult={-1} team={team2} />
            </Container>
          </div> */}
        </>
      ) : (
        <div className="w-full h-full">
          <div className="flex flex-col items-center font-mono space-y-2 mt-[10%]">
            <p className="text-white text-5xl sm:text-7xl">{error}</p>
          </div>
        </div>
      )}
    </>
  );
};
