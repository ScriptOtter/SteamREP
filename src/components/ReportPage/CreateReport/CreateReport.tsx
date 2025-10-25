import { useEffect, useState } from "react";
import { Input } from "../../Input";

import { toast } from "react-toastify";
import { getSteamUser } from "@/data/getUser";
import { getUserId } from "@/utils/steamUrl";
import { SelectOptions } from "../../selecteOptions";
import { useDispatch } from "react-redux";
import { createApi } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { z } from "zod";
import { AxiosError } from "axios";
import { useDebounce } from "@/hooks/use-debounce";
import { ToastWarning } from "@/components/Toasts/ToastWarning";

export const CreateReportSideBar = () => {
  type FormData = z.infer<typeof formDataScheme>;

  const initialFormData = {
    steamUrl: "",
    youtubeLink: "",
    demoLink: "",
    comment: "",
  };

  const formDataScheme = z.object({
    steamUrl: z.string().min(2),
    youtubeLink: z
      .string()
      .optional()
      .refine(
        (link) => {
          return link
            ? link.trim().startsWith("https://www.youtube.com/watch?v=") ||
                link.trim().startsWith("https://youtu.be/")
            : true;
        },
        {
          message: "Youtube link is not valid!",
        }
      ),

    demoLink: z
      .string()
      .optional()
      .refine(
        (link) => {
          // Проверяем, если link существует и является непустой строкой
          return link ? link.trim().startsWith("steam://rungame/730/") : true;
        },
        {
          message: "Demo link is not valid!",
        }
      ),

    comment: z
      .string()
      .optional()
      .refine(
        (comment) => {
          if (!comment) return true;
          const words = comment.trim().split(/s+/);
          return words.length <= import.meta.env.VITE_MAX_LENGTH_COMMENT;
        },
        {
          message:
            "The comment cannot contain more than " +
            import.meta.env.VITE_MAX_LENGTH_COMMENT +
            " words",
        }
      )
      .refine(
        (comment) => {
          if (!comment) return true;
          const words = comment.trim().split(/s+/);
          return words.every(
            (word) => word.length <= import.meta.env.VITE_MAX_LENGTH_COMMENT!
          );
        },
        {
          message:
            "The maximum word length should not exceed " +
            import.meta.env.VITE_MAX_LENGTH_WORD_COMMENT!,
        }
      ),
  });

  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);

  const formData = {
    ...initialFormData,
    ...userFormData,
  };

  const validate = () => {
    const res = formDataScheme.safeParse(userFormData);
    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const handleCreateReport = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validate();

    if (errors || selectedOptions.toString() === "") {
      setShowErrors(true);

      return;
    } else {
      const data = {
        ...formData,
        recipientId: formData.steamUrl,
        reasonsReport: selectedOptions,
      };
      try {
        const res = await api.post(API_ENDPOINTS.createReport, data, {
          withCredentials: true,
        });

        if (!res) {
          return;
        }
        //setUserFormData(initialFormData);
        toast.success(
          <div className="font-bold">
            <p>Report Created!</p>
            <p>ID: {res.data.id}</p>
          </div>
        );
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          ToastWarning(e.response?.data.message);
        }
      }
    }
  };

  const errors = showErrors ? validate() : undefined;

  const [nickname, setNickname] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const api = createApi(dispatch);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelectedOptionsChange = (options: string[]) => {
    setSelectedOptions(options);
  };

  const debouncedSteamUrl = useDebounce(formData.steamUrl, 1000);

  useEffect(() => {
    const fetchSteamUsername = async (steamUrl: string) => {
      if (steamUrl === "") {
        return;
      }
      try {
        const res = await getSteamUser(getUserId(steamUrl));
        if (res) {
          setNickname(res.personaName || "");
          setVisible(true);
        }

        return res;
      } catch (e) {}
    };

    if (debouncedSteamUrl === "") {
      setVisible(false);
    } else {
      fetchSteamUsername(debouncedSteamUrl);
    }
  }, [debouncedSteamUrl]); // Зависимость - дебаунсированный URL

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
              <label className="text-red-500 text-[12px]">
                {errors?.steamUrl?._errors}
              </label>
            </div>
            <div>
              <Input
                variant="forAuth"
                placeholder="Steam ID / Steam Profile Link / Custom Steam URL"
                value={formData.steamUrl}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    steamUrl: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div hidden={!visible}>
              <div className="flex justify-between mb-3">
                <label className="text-white text-[14px]">Ник читера</label>
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
              <label className="text-red-500 text-[12px]">
                {errors?.youtubeLink?._errors}
              </label>
            </div>
            <div>
              <Input
                variant="forAuth"
                placeholder="https://www.youtube.com/"
                value={formData.youtubeLink}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    youtubeLink: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">Ссылка на демку</label>
              <label className="text-red-500 text-[12px]">
                {errors?.demoLink?._errors}
              </label>
            </div>
            <div>
              <Input
                variant="forAuth"
                placeholder="steam://rungame/730/"
                value={formData.demoLink}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    demoLink: e.target.value,
                  }))
                }
                className="hover:outline-1 hover:outline-white"
              ></Input>
            </div>
            <div className="flex justify-between mb-3">
              <label className="text-white text-[14px]">
                Give reasons reports
              </label>
              <label className="text-red-500 text-[12px]">
                {selectedOptions.toString() === "" && errors && "Reasons Empty"}
              </label>
            </div>
            <SelectOptions onChange={handleSelectedOptionsChange} />
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-white text-[14px] ">
                  Комментарий (не обязательно)
                </label>
                <label className="text-red-500 text-[12px]">
                  {errors?.comment?._errors}
                </label>
              </div>
              <textarea
                className="text-white break-all w-full border-orange-500 border-1 rounded-s bg-gray-700 px-2 text-xs py-2.5"
                value={formData.comment}
                onChange={(e) =>
                  setUserFormData((l) => ({
                    ...l,
                    comment: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            <button
              onClick={handleCreateReport}
              disabled={!!errors}
              type="submit"
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
