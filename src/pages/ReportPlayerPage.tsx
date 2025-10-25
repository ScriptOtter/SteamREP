import { Container } from "@/components/container";

import { CreateReportSideBar } from "@/components/ReportPage/CreateReport/CreateReport";
import ModalAlert from "@/components/ReportPage/ModalAlert";
import { MyReportsSideBar } from "@/components/ReportPage/MyReports/MyReportsSideBar";
import { OverwatchSideBar } from "@/components/ReportPage/OverwatchReport/OverwatchSideBar";
import { ReviewedDemosSideBar } from "@/components/ReportPage/ReviewedDemoReport/ReviewedDemosSideBar";
import { useAuth } from "@/hooks/use-auth";

import { cn } from "@/lib/utils";
import { Header } from "@/views/Header";
import { Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const ReportPlayerPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("Overwatch");

  const auth = useAuth();
  useEffect(() => {}, [auth.role]);
  const [modal, setModal] = useState<boolean>(true);

  const NAVIGATION_MENU = [
    { path: "Overwatch", name: "Overwatch" },
    { path: "ReviewedDemos", name: "Reviewed Demos" },
    { path: "MyReports", name: "My Reports" },
    { path: "CreateReport", name: "Create Report" },
  ];

  useEffect(() => {
    if (auth.role === "VERIFIED") setModal(false);
  }, [auth.role]);

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

      {modal && <ModalAlert setModal={setModal} auth={auth} />}

      <div
        className={cn(
          modal && "opacity-10",
          "bg-secondary h-full min-h-screen shadow-lg p-4"
        )}
      >
        <div className="flex justify-center items-center">
          <Container className="max-w-[1440px]">
            <div className="overflow-x-auto ">
              <div className="min-w-[500px]">
                <nav className="flex justify-end mb-4 space-x-5">
                  {NAVIGATION_MENU.map((item) => (
                    <p
                      className={cn(
                        currentPage === item.path
                          ? "text-light-blue-2"
                          : "text-white",
                        "cursor-pointer hover:text-light-blue duration-50"
                      )}
                      onClick={() => {
                        setCurrentPage(item.path);
                        window.location.hash = `#${item.path}`;
                      }}
                    >
                      {item.name}
                    </p>
                  ))}
                </nav>

                {currentPage === "Overwatch" && <OverwatchSideBar />}
                {currentPage === "ReviewedDemos" && <ReviewedDemosSideBar />}
                {currentPage === "MyReports" && <MyReportsSideBar />}
                {currentPage === "CreateReport" && <CreateReportSideBar />}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
