import { Container } from "@/component/container";

import { OverwatchSideBar } from "@/component/OverwatchSideBar";

import { ReportPageRightSidebar } from "@/component/ReportPageRightSideBar";
import { cn } from "@/lib/utils";

import { Header } from "@/views/Header";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";

export const ReportPlayerPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("Overwatch");

  return (
    <>
      <Header />

      <div className="bg-[#2F3136] h-full min-h-screen shadow-lg p-4">
        <div className="flex justify-center items-center">
          <Container>
            {/* Ограничение максимальной ширины */}

            <h1 className="text-2xl text-white pt-6 mb-4 text-center md:text-left">
              Report (Доступно тем кто верифицировался через стим)
            </h1>
            <nav className="flex justify-between text-white text-2xl mb-2">
              <div className="flex space-x-3">
                <p
                  className={cn(
                    currentPage === "Overwatch" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => setCurrentPage("Overwatch")}
                >
                  <div className="flex items-center space-x-1">
                    <Eye size={32} />
                    <p>Overwatch</p>
                  </div>
                </p>
                <p
                  className={cn(
                    currentPage === "ReviewedDemos" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => setCurrentPage("ReviewedDemos")}
                >
                  Reviewed Demos
                </p>
                <p
                  className={cn(
                    currentPage === "MyComplaints" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => setCurrentPage("MyComplaints")}
                >
                  My Reports
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    currentPage === "CreateReport" && "text-orange-500",
                    "cursor-pointer hover:text-orange-400 duration-600"
                  )}
                  onClick={() => setCurrentPage("CreateReport")}
                >
                  <div className="flex items-center space-x-2">
                    <Plus size={32} /> <p>Create Report</p>
                  </div>
                </p>
              </div>
            </nav>
            {currentPage === "Overwatch" && <OverwatchSideBar />}

            {currentPage === "CreateReport" && <ReportPageRightSidebar />}
          </Container>
        </div>
      </div>
    </>
  );
};
