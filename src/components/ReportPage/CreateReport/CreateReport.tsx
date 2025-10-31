import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { useAuth } from "@/hooks/use-auth";

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
    youtubeLink: z.string().refine(
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
  const auth = useAuth();
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
      setError(true);
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
        setUserFormData(initialFormData);
        setResetTrigger((prev) => !prev);
        setError(false);
        toast.success(
          <div className="font-bold">
            <p>Report Created!</p>
            <p>ID: {res.data.id}</p>
          </div>,
          {
            theme: "dark",
          }
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

  const debouncedSteamUrl = useDebounce(formData.steamUrl, 1000);

  useEffect(() => {
    const fetchSteamUsername = async (steamUrl: string) => {
      if (steamUrl === "") {
        return;
      }
      try {
        const res = await getSteamUser(getUserId(steamUrl));

        setNickname(res.personaName || "Steam user not found");
        setVisible(true);

        console.log(res);
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
      <div className=" w-full h-full flex justify-center items-center my-2">
        <Container>
          <div className="bg-secondary  flex justify-center w-full ">
            <div className="w-[705px] rounded-xl outline-1 outline-light-gray px-8 py-10">
              <p className=" text-[14px] font-semibold mb-4 text-white">
                Suspect SteamID
              </p>

              <div className="mb-4">
                <input
                  className={cn(
                    errors?.steamUrl?._errors
                      ? "outline-red"
                      : "outline-light-gray-2",
                    "w-full pl-4 py-2 text-white placeholder:text-light-gray outline-1  rounded-md hover:outline-light-gray-3 focus:outline-light-blue"
                  )}
                  placeholder="Steam ID / Steam Profile Link / Custom Steam URL"
                  value={formData.steamUrl}
                  onChange={(e) =>
                    setUserFormData((l) => ({
                      ...l,
                      steamUrl: e.target.value,
                    }))
                  }
                ></input>
              </div>
              <div hidden={!visible} className="relative pt-4">
                <p className="absolute text-xs px-1 top-1.5 left-2.5 text-light-gray-2 bg-secondary">
                  Suspect Nickname
                </p>
                <div className="mb-4">
                  <input
                    disabled
                    readOnly
                    className={cn(
                      nickname === "Steam user not found"
                        ? "outline-red"
                        : "outline-light-gray-2",
                      "w-full pl-4 py-2 text-light-gray  outline-1  rounded-md hover:outline-light-gray-3 hover:cursor-no-drop"
                    )}
                    placeholder="Nickname"
                    value={nickname || ""}
                    onChange={(e) => setNickname(e.target.value)}
                  ></input>
                </div>
              </div>
              <p className=" text-[14px] font-semibold mb-4  text-white">
                Link to the suspicious moment
              </p>
              <div className="mb-4">
                <input
                  className={cn(
                    errors?.youtubeLink?._errors
                      ? "outline-red"
                      : "outline-light-gray-2",
                    "w-full pl-4 py-2 text-white placeholder:text-light-gray  outline-1  rounded-md hover:outline-light-gray-3 focus:outline-light-blue"
                  )}
                  placeholder="https://www.youtube.com/"
                  value={formData.youtubeLink}
                  onChange={(e) =>
                    setUserFormData((l) => ({
                      ...l,
                      youtubeLink: e.target.value,
                    }))
                  }
                ></input>
              </div>
              <p className=" text-[14px] font-semibold mb-4 text-white">
                Link to this match
              </p>
              <div className="mb-4">
                <input
                  className={cn(
                    errors?.demoLink?._errors
                      ? "outline-red"
                      : "outline-light-gray-2",
                    "w-full pl-4 py-2 text-white placeholder:text-light-gray  outline-1  rounded-md hover:outline-light-gray-3 focus:outline-light-blue"
                  )}
                  placeholder="Optional steam://rungame/730/"
                  value={formData.demoLink}
                  onChange={(e) =>
                    setUserFormData((l) => ({
                      ...l,
                      demoLink: e.target.value,
                    }))
                  }
                ></input>
              </div>
              <p className=" text-[14px] font-semibold mb-4 text-white">
                Give reasons
              </p>
              <SelectOptions
                onChange={setSelectedOptions}
                error={error}
                value={selectedOptions}
                resetTrigger={resetTrigger}
                className="mb-4"
              />
              <div className="mb-4">
                <div className="flex justify-between">
                  <label className="text-[14px] font-semibold mb-4 text-white">
                    Enter your comment
                  </label>
                  <label className="text-red-500 text-[14px]">
                    {errors?.comment?._errors}
                  </label>
                </div>
                <textarea
                  className="text-white break-all w-full border-light-gray-3 outline-none transition-all duration-200 resize-none border-1 rounded-lg px-4 py-3 focus:h-32 h-18 focus:border-light-blue placeholder:text-light-gray"
                  value={formData.comment}
                  onChange={(e) =>
                    setUserFormData((l) => ({
                      ...l,
                      comment: e.target.value,
                    }))
                  }
                  placeholder={auth.isAuth ? "Optional" : "Please log in first"}
                  disabled={!auth.isAuth}
                ></textarea>
              </div>
              <div className="flex items-center justify-end space-x-4 my-2 pb-4">
                <button
                  onClick={handleCreateReport}
                  disabled={!!errors && !auth.isAuth}
                  type="submit"
                  className={cn(
                    auth.isAuth
                      ? "bg-light-blue outline-light-blue-2 cursor-pointer"
                      : "bg-light-gray outline-light-gray-2 cursor-no-drop",
                    "rounded-xl outline-1 px-4 py-1 text-white"
                  )}
                >
                  Send Report
                </button>
              </div>
              <div className="">
                <p className="text-white text-[16px] font-semibold">
                  Recommendations for filling out the form:
                </p>
                <div className="text-[12px] text-light-gray-3">
                  <p>The maximum video length is 2 minutes</p>
                  <p>Video resolution is not less than 720p</p>
                  <p>There should be no music in the background</p>
                  <p>The link to your clip must be available.</p>
                  <p>
                    Editing in videos is permitted as long as it does not
                    interfere with the perception of the game situation.
                  </p>
                  <p>The video should not contain advertising banners</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
