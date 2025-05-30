import { Input } from "@/component/Input";
import { ReportPageRightSidebar } from "@/component/ReportPageRightSideBar";
import { getSteamUser } from "@/data/getUser";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { cn } from "@/lib/utils";
import { getUserId } from "@/utils/steamUrl";
import { Header } from "@/views/Header";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Check, CheckCheck, CheckLineIcon, ListChecks } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const ReportPlayerPage = () => {
  const [nickname, setNickname] = useState<string>("");
  const [steamUrl, setSteamUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [visble, setVisible] = useState<boolean>(false);
  const { isMenuOpen, toggleMenu, menuRef } = useDropDownMenu();

  const [comment, setComment] = useState<string>("");

  const options = [
    { key: 1, value: "WALL HACKING" },
    { key: 2, value: "AIM" },
    { key: 3, value: "OTHER HACKING" },
    { key: 4, value: "FARM BOT" },
  ];

  const handleOptionClick = (value) => {
    setSelectedWords((prevSelectedWords) => {
      const newSelectedWords = prevSelectedWords.includes(value)
        ? prevSelectedWords.filter((word) => word !== value) // Убираем слово
        : [...prevSelectedWords, value]; // Добавляем слово

      console.log(newSelectedWords);
      return newSelectedWords; // Возвращаем новое состояние
    });

    // Обновляем значение input
  };

  const handleReport = () => {
    if (nickname && steamUrl && youtubeUrl && demoUrl && selectedWords) {
      console.log(nickname, steamUrl, youtubeUrl, demoUrl, selectedWords);
    } else toast.error("Input is null");
    if (selectedWords.length === 0) toast("Выберите причины репорта");
  };

  useEffect(() => {
    const fetchSteamUsername = async (steamUrl: string) => {
      try {
        const res = await getSteamUser(getUserId(steamUrl));
        setNickname("");
        setNickname(res.personaName!);
        setVisible(true);
        return res;
      } catch (e) {
        console.log(e);
      }
    };
    fetchSteamUsername(steamUrl);
  }, [steamUrl]);

  return (
    <>
      <Header />

      <div className="bg-[#2F3136] h-screen shadow-lg p-4">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[1000px]">
            {/* Ограничение максимальной ширины */}
            <h1 className="text-2xl text-white pt-6 mb-4 text-center md:text-left">
              Report (Доступно тем кто верифицировался через стим)
            </h1>
            <div className="flex flex-col md:flex-row">
              <div className="bg-gray-900 w-full md:w-1/2 p-4">
                {/* Добавление отступа */}
                <div>1</div>
              </div>
              <div className="bg-[#2F3136] w-full md:w-1/2 rounded-xl p-4">
                {/* Добавление отступа */}
                <ReportPageRightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
