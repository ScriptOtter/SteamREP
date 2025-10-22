import { VacTrackerWidget } from "@/components/VacTrackerWidget";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const VacTracker = () => {
  return (
    <>
      <div className="mb-[15%]">
        <Header />

        <VacTrackerWidget />
      </div>
      <Footer />
    </>
  );
};
