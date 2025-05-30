import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { toast } from "react-toastify";
import { getSteamUser } from "@/data/getUser";
import { getUserId } from "@/utils/steamUrl";
import { Check, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export const ReportPageRightSidebar = () => {
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
        if (res) {
          setNickname("");
          setNickname(res.personaName!);
          setVisible(true);
        }

        return res;
      } catch (e) {
        console.log(e);
      }
    };
    fetchSteamUsername(steamUrl);
  }, [steamUrl]);
  return (
    <>
      <div className="flex flex-col space-y-4 mt-2.5">
        <div className="flex justify-between mb-3">
          <label className="text-white text-[14px]">
            Ссылка на стим читера
          </label>
          <label className="text-red-500 text-[12px]">1</label>
        </div>
        <div>
          <Input
            variant="forAuth"
            placeholder="Steam ID / Steam Profile Link / Custom Steam URL"
            value={steamUrl}
            onChange={(e) => setSteamUrl(e.target.value)}
          ></Input>
        </div>
        <div hidden={!visble}>
          <div className="flex justify-between mb-3">
            <label className="text-white text-[14px]">Ник читера</label>
            <label className="text-red-500 text-[12px]">1</label>
          </div>
          <div>
            <Input
              disabled
              readOnly
              variant="forAuth"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="hover:cursor-no-drop"
            ></Input>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <label className="text-white text-[14px]">Ссылка на ютуб</label>
          <label className="text-red-500 text-[12px]">1</label>
        </div>
        <div>
          <Input
            variant="forAuth"
            placeholder="https://www.youtube.com/"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          ></Input>
        </div>
        <div className="flex justify-between mb-3">
          <label className="text-white text-[14px]">Ссылка на демку</label>
          <label className="text-red-500 text-[12px]">1</label>
        </div>
        <div>
          <Input
            variant="forAuth"
            placeholder="steam://rungame/730/"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className="hover:outline-1 hover:outline-white"
          ></Input>
        </div>
        <div className="flex justify-between mb-3">
          <label className="text-white text-[14px]">
            Укажите причины репорта
          </label>
          <label className="text-red-500 text-[12px]">1</label>
        </div>

        <div ref={menuRef} className="relative mb-3">
          <Input
            variant="forAuth"
            type="text"
            readOnly
            onClick={toggleMenu}
            value={selectedWords.join(", ")}
            placeholder="Выберите слова..."
            className="block w-full p-1 border border-gray-300 rounded-md cursor-pointer hover:outline-1 hover:outline-white"
          />
          <ListChecks
            size={22}
            className="absolute right-2 top-1.5 text-white cursor-pointer"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div className="absolute z-10 w-full shadow-white rounded-xs mt-1 shadow-xs bg-[#2F3136] text-white">
              {options.map((option) => (
                <div
                  key={option.key}
                  onClick={() => handleOptionClick(option.value)}
                  className={
                    cn(
                      selectedWords.includes(option.value)
                        ? "bg-orange-500"
                        : "bg-[#2F3136]"
                    ) +
                    " cursor-pointer rounded-xs p-1 m-0.5 hover:outline-1 hover:outline-white"
                  }
                >
                  <div className="flex justify-between mx-2">
                    {option.value}{" "}
                    {selectedWords.includes(option.value) && <Check />}
                  </div>
                  {selectedWords.includes(option.value)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-white text-[14px] ">
              Комментарий (не обязательно)
            </label>
            <label className="text-red-500 text-[12px]">1</label>
          </div>
          <textarea
            className="text-white break-all w-full border-orange-500 border-1 rounded-s bg-gray-700 px-2 text-xs py-2.5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={() => handleReport()}
          className="bg-orange-500 rounded-2xl cursor-pointer"
        >
          Кнопка
        </button>

        <div className="text-white text-[14px]">
          <p>Рекомендация к заполнению формы:</p>
          <div className="text-[12px]">
            <p>Максимальная длина видео 2 минуты</p>
            <p>Разрешение видео не меньше 720p</p>
            <p>Не должно быть музыки на заднем фоне</p>
            <p>Ссылка на ваш клип должна быть доступна</p>
            <p>
              Монтаж в видео разрешен, если он не мешает восприятию игровой
              ситуации
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
