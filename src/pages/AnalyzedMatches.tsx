import AnalyzedMatchesHeader from "@/components/AnalyzedMatches/AnalyzedMatchesHeader";
import AnalyzedMatchesItem from "@/components/AnalyzedMatches/AnalyzedMatchesItem";
import { Container } from "@/components/container";
import { IMatches } from "@/components/CS2MatchesPage/CS2Matches";
import { PageLoader } from "@/components/Loader";
import { API_ENDPOINTS } from "@/services/apiService";
import { Header } from "@/views/Header";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface IAnalyzedMatches {
  matches: IMatches[];
  totalMatches: number;
  totalPages: number;
}

export const AnalyzedMatches = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [matches, setMatches] = useState<IMatches[]>([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await axios.get(
          API_ENDPOINTS.getAnalyzedMatches + `?page=${page}&limit=25`
        );

        const data: IAnalyzedMatches = res.data;
        setMatches((prev) => [...prev, ...data.matches]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };
    getMatches();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          console.log(`obsrver ${loading} ${page} ${totalPages}`);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.01 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); // Останавливаем наблюдение при размонтировании
      }
    };
  }, [loaderRef, loading]);
  return (
    <>
      <Header />

      <div className="w-full min-h-screen max-h-screen flex justify-center">
        <Container className="max-w-full mx-8">
          <p className="text-white text-2xl mb-4">
            Real-time CS2 match analysis
          </p>
          <div className="bg-light-gray w-full h-[0.5px] mb-8"></div>
          <div className="overflow-x-auto">
            <div className="min-w-[1440px]">
              <AnalyzedMatchesHeader />
              {matches.map((item) => (
                <AnalyzedMatchesItem key={item.id} match={item} />
              ))}
              {page < totalPages && (
                <div className="flex justify-end" ref={loaderRef}>
                  <PageLoader size={20} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
