import { Container } from "@/components/container";

import { CreateReportSideBar } from "@/components/ReportPage/CreateReport/CreateReport";
import { MyReportsSideBar } from "@/components/ReportPage/MyReports/MyReportsSideBar";
import { OverwatchSideBar } from "@/components/ReportPage/OverwatchReport/OverwatchSideBar";
import { ReviewedDemosSideBar } from "@/components/ReportPage/ReviewedDemoReport/ReviewedDemosSideBar";
import { cn } from "@/lib/utils";
import { Header } from "@/views/Header";
import { Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const ReportPlayerPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("Overwatch");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", ""); // Получаем хэш без #
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("Overwatch"); // Если хэш пустой, устанавливаем значение по умолчанию
      }
    };

    // Устанавливаем обработчик события при монтировании компонента
    window.addEventListener("hashchange", handleHashChange);

    // Вызываем функцию при первом рендере, чтобы установить начальное значение
    handleHashChange();

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <Header />

      <div className="bg-secondary h-full min-h-screen shadow-lg p-4">
        <div className="flex justify-center items-center">
          <Container>
            {/* Ограничение максимальной ширины */}

            <h1 className="text-2xl text-white mb-4 text-center md:text-left">
              Report (Доступно тем кто верифицировался через стим)
            </h1>
            <nav className="flex justify-between text-white text-2xl mb-2">
              <div className="flex space-x-3">
                <div
                  className={cn(
                    currentPage === "Overwatch" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => {
                    setCurrentPage("Overwatch");
                    window.location.hash = "#Overwatch"; // Добавляем # в URL
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <Eye size={32} />
                    <p>Overwatch</p>
                  </div>
                </div>
                <div
                  className={cn(
                    currentPage === "ReviewedDemos" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => {
                    setCurrentPage("ReviewedDemos");
                    window.location.hash = "#ReviewedDemos"; // Добавляем # в URL
                  }}
                >
                  Reviewed Demos
                </div>
                <div
                  className={cn(
                    currentPage === "MyReports" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => {
                    setCurrentPage("MyReports");
                    window.location.hash = "#MyReports"; // Добавляем # в URL
                  }}
                >
                  My Reports
                </div>
              </div>
              <div>
                <div
                  className={cn(
                    currentPage === "CreateReport" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => {
                    setCurrentPage("CreateReport");
                    window.location.hash = "#CreateReport"; // Добавляем # в URL
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Plus size={32} /> <p>Create Report</p>
                  </div>
                </div>
              </div>
            </nav>
            {currentPage === "Overwatch" && <OverwatchSideBar />}
            {currentPage === "ReviewedDemos" && <ReviewedDemosSideBar />}
            {currentPage === "MyReports" && <MyReportsSideBar />}
            {currentPage === "CreateReport" && <CreateReportSideBar />}
          </Container>
        </div>
      </div>
    </>
  );
};
