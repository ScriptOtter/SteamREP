import { useEffect, useState } from "react";
import { Input } from "./Input";

import { toast } from "react-toastify";
import { getSteamUser } from "@/data/getUser";
import { getUserId } from "@/utils/steamUrl";
import { SelectOptions } from "./selecteOptions";

export const ReportPageRightSidebar = () => {
  const [nickname, setNickname] = useState<string>("");
  const [steamUrl, setSteamUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");

  const [visble, setVisible] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const handleReport = () => {
    if (nickname && steamUrl && youtubeUrl && demoUrl && selectedOptions) {
      console.log(nickname, steamUrl, youtubeUrl, demoUrl, selectedOptions);
    } else toast.error("Input is null");
    console.log(selectedOptions);
    if (selectedOptions.length === 0) toast("Выберите причины репорта");
  };
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelectedOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
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
    if (steamUrl === "") {
      setVisible(false);
    }
    fetchSteamUsername(steamUrl);
  }, [steamUrl]);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-900 w-full md:w-1/2 p-4">
          {/* Добавление отступа */}
          <div>1</div>
        </div>

        <div className="bg-[#2F3136] w-full md:w-1/2 rounded-xl p-4">
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
                  value={nickname || ""}
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
            <SelectOptions onChange={handleSelectedOptionsChange} />
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
        </div>
      </div>
    </>
  );
};
