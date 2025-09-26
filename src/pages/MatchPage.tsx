import { Container } from "@/components/container";
import { MatchInformation } from "@/components/Match/MatchInformation";
import { MatchPlayersStats } from "@/components/Match/MatchPlayersStats";
import { MatchResultWithImg } from "@/components/Match/MatchResultWithImg";
import { IMatchPlayer } from "@/models/IMatchPlayer";
import { Header } from "@/views/Header";

export const MatchPage = () => {
  //const matchData = { map: "de_dust2" };
  const team1: IMatchPlayer[] = [
    {
      suspense: false,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 7,
      kills: 12,
      death: 15,
      assists: 2,
      mvp: 7,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 4,
      kills: 12,
      death: 1,
      assists: 2,
      mvp: 6,
      damage: 2002,
      adr: 46,
      hs: 52,
    },
    {
      suspense: false,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 8,
      kills: 16,
      death: 5,
      assists: 10,
      mvp: 1,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 7,
      kills: 10,
      death: 5,
      assists: 10,
      mvp: 4,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: false,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 13,
      kills: 24,
      death: 5,
      assists: 10,
      mvp: 7,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
  ];
  const team2: IMatchPlayer[] = [
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 7,
      kills: 23,
      death: 53,
      assists: 12,
      mvp: 15,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 4,
      kills: 14,
      death: 7,
      assists: 0,
      mvp: 6,
      damage: 2002,
      adr: 46,
      hs: 52,
    },
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 8,
      kills: 16,
      death: 5,
      assists: 10,
      mvp: 1,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: true,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 7,
      kills: 10,
      death: 5,
      assists: 10,
      mvp: 4,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
    {
      suspense: false,
      image: "/map_icons/map_icon_cs_office.svg",
      nickname: "Player 1",
      rank: 13,
      kills: 24,
      death: 5,
      assists: 10,
      mvp: 7,
      damage: 2002,
      adr: 42,
      hs: 52,
    },
  ];
  return (
    <>
      <Header />
      <MatchInformation />
      <MatchResultWithImg teamName={"A"} team1={team1} team2={team2} />

      <div className="flex justify-center mt-6">
        <Container className="text-white">
          <MatchPlayersStats teamName={"A"} matchResult={1} team={team1} />
          <MatchPlayersStats teamName={"B"} matchResult={-1} team={team2} />
        </Container>
      </div>
    </>
  );
};
