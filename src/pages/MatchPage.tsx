import { Container } from "@/component/container";
import { MatchHeader } from "@/component/Match/MatchHeader";
import { PlayerStatsItem } from "@/component/Match/PlayerStatsItem";
import { Header } from "@/views/Header";

export const MatchPage = () => {
  return (
    <>
      <Header />
      <div>
        <p className="text-white ">Match ID:</p>
      </div>
      <div className="flex justify-center">
        <Container className="text-white ">
          <MatchHeader />

          <div className="bg-green-600 rounded-2xl py-2">
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
          </div>
          <div className="bg-red-600 rounded-2xl py-2">
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
            <PlayerStatsItem />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Container>
      </div>
    </>
  );
};
