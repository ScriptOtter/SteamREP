import { IAuth } from "@/models/IAuth";
import { ISocialLinks } from "@/models/ISocialLinks";
import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";
import { AxiosResponse } from "axios";

export const saveSocialLinks = async (
  site: string,
  url: string,
  dispatch: any
) => {
  const api = createApi(dispatch);
  try {
    const res = await api.patch(
      API_ENDPOINTS.patchSocialLinks,
      { site: site, url: url },
      { withCredentials: true }
    );

    if (!res) {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSocialLinks = async (
  dispatch: any,
  id: string
): Promise<ISocialLinks | null> => {
  const api = createApi(dispatch);
  try {
    const res: AxiosResponse<ISocialLinks> = await api.get(
      API_ENDPOINTS.getSocialLinks + id
    );

    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getMySocialLinks = async (
  dispatch: any,
  auth: IAuth
): Promise<ISocialLinks | null> => {
  const api = createApi(dispatch);
  try {
    const res: AxiosResponse<ISocialLinks> = await api.get(
      API_ENDPOINTS.getSocialLinks + auth.steamid
    );

    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
