import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../services/apiService";
import { ISteamUser } from "../models/ISteamUser";
import { removeUser, setUser } from "@/store/UserSlice";
import { createApi } from "@/services/axios";

export const refreshToken = async (dispatch: any) => {
  try {
    const res = await axios.get(API_ENDPOINTS.refresh, {
      withCredentials: true,
    });

    if (res) {
      const res = await axios.get(API_ENDPOINTS.me, { withCredentials: true });

      dispatch(setUser(res.data));
    } else dispatch(removeUser());
    return res;
  } catch (e) {
    dispatch(removeUser());
  }
};

export const getMe = async (dispatch: any): Promise<boolean> => {
  const api = createApi(dispatch);
  const isAuth = localStorage.getItem("auth");
  if (isAuth) {
    try {
      const res = await api.get(API_ENDPOINTS.me, { withCredentials: true });

      if (!res) {
        return false;
      } else {
        dispatch(setUser(res.data));
        return true;
      }
    } catch (error) {
      return false;
    }
  } else return false;
};

export const getSteamUser = async (id: string): Promise<ISteamUser> => {
  const res: AxiosResponse<ISteamUser> = await axios.post(
    API_ENDPOINTS.steamid + id
  );
  return res.data;
};

export const getViewers = async (id: string): Promise<number> => {
  const res: AxiosResponse<number> = await axios.get(
    API_ENDPOINTS.getSteamViewers + id
  );
  return res.data;
};
