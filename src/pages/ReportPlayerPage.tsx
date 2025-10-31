import { Container } from "@/components/container";

import { CreateReportSideBar } from "@/components/ReportPage/CreateReport/CreateReport";
import ModalAlert from "@/components/ReportPage/ModalAlert";
import { MyReportsSideBar } from "@/components/ReportPage/MyReports/MyReportsSideBar";
import { OverwatchSideBar } from "@/components/ReportPage/OverwatchReport/OverwatchSideBar";
import { ReviewedDemosSideBar } from "@/components/ReportPage/ReviewedDemoReport/ReviewedDemosSideBar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Header } from "@/views/Header";
import { useEffect, useState } from "react";

export const ReportPlayerPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("Overwatch");

  const auth = useAuth();
  useEffect(() => {}, [auth.role]);
  const [modal, setModal] = useState<boolean>(true);

  const NAVIGATION_MENU = [
    { path: "Overwatch", name: "Overwatch", visible: true },
    { path: "ReviewedDemos", name: "Reviewed Demos", visible: auth.isAuth },
    { path: "MyReports", name: "My Reports", visible: auth.isAuth },
    { path: "CreateReport", name: "Create Report", visible: true },
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
        <div className="flex justify-center items-center mb-10">
          <Container className="max-w-[1440px]">
            <div className="overflow-x-auto overflow-y-hidden">
              <div className="min-w-[500px]">
                <nav className="flex justify-end mb-4 space-x-5">
                  {NAVIGATION_MENU.map((item) => (
                    <p
                      key={item.path}
                      className={cn(
                        currentPage === item.path
                          ? "text-light-blue-2"
                          : "text-white",

                        "cursor-pointer hover:text-light-blue duration-50 my-0.5 mx-1.5",
                        item.name === "Create Report" &&
                          "text-purple-400 hover:text-purple-500"
                      )}
                      onClick={() => {
                        setCurrentPage(item.path);
                        window.location.hash = `#${item.path}`;
                      }}
                    >
                      {item.visible && item.name}
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
