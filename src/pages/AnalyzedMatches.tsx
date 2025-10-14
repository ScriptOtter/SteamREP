import { Container } from "@/components/container";
import { Header } from "@/views/Header";

export const AnalyzedMatches = () => {
  return (
    <>
      <Header />

      <div className="w-full min-h-screen max-h-screen flex justify-center">
        <Container className="max-w-full mx-8">
          <p className="text-white text-2xl mb-4">
            Real-time CS2 match analysis
          </p>
          <div className="bg-light-gray w-full h-[1px] mb-8"></div>
          <div className="bg-green-400 text-white grid grid-cols-9">
            <div></div>
            <div>Rank</div>
            <div>Date</div>
            <div>Map</div>
            <div>Team A</div>

            <div>Team B</div>
            <div className="flex items-stretch space-x-8">
              <div>K</div>
              <div>D</div>
              <div>A</div>
            </div>
            <div className="flex items-stretch space-x-8">
              <div>5k</div>
              <div>4k</div>
              <div>3k</div>
            </div>
            <div className="flex items-stretch space-x-8">
              <div>1v5</div>
              <div>1v4</div>
              <div>1v3</div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
