import { API_ENDPOINTS } from "@/services/apiService";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const saveTelegramLink = async (url: string) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.patchSocialLinks,
      {
        site: "telegramLink",
        link: url,
      },
      { withCredentials: true }
    );

    toast.success(
      <div className="font-bold">
        <p>{res.data.message}</p>
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(
        <div className="font-bold">
          <p>{e.response?.data.message}</p>
        </div>
      );
  }
};

export const saveTradeLink = async (url: string) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.patchSocialLinks,
      {
        site: "tradeLink",
        link: url,
      },
      { withCredentials: true }
    );
    console.log(res);
    toast.success(
      <div className="font-bold">
        <p>{res.data.message}</p>
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(
        <div className="font-bold">
          <p>{e.response?.data.message}</p>
        </div>
      );
  }
};

export const saveTwitchLink = async (url: string) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.patchSocialLinks,
      {
        site: "twitchLink",
        link: url,
      },
      { withCredentials: true }
    );
    toast.success(
      <div className="font-bold">
        <p>{res.data.message}</p>
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(
        <div className="font-bold">
          <p>{e.response?.data.message}</p>
        </div>
      );
  }
};

export const saveYoutubeLink = async (url: string) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.patchSocialLinks,
      {
        site: "youtubeLink",
        link: url,
      },
      { withCredentials: true }
    );
    toast.success(
      <div className="font-bold">
        <p>{res.data.message}</p>
      </div>
    );
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(
        <div className="font-bold">
          <p>{e.response?.data.message}</p>
        </div>
      );
  }
};

export const saveDiscordNickname = async (url: string) => {
  try {
    const res = await axios.post(
      API_ENDPOINTS.patchSocialLinks,
      {
        site: "discordNickname",
        link: url,
      },
      { withCredentials: true }
    );
    toast.success(
      <div className="font-bold">
        <p>{res.data.message}</p>
      </div>
    );
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof AxiosError)
      toast.error(
        <div className="font-bold">
          <p>{e.response?.data.message}</p>
        </div>
      );
  }
};
