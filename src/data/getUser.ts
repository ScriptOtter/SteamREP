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
    console.log("refreshTOKEN!");
    console.log(res);
    if (res) {
      const res = await axios.get(API_ENDPOINTS.me, { withCredentials: true });
      console.log(res);
      dispatch(setUser(res.data));
    } else dispatch(removeUser());
    return res;
  } catch (e) {
    console.log("refreshTOKEN! CATCH");
    console.log(e);
    dispatch(removeUser());
  }
};

export const getMe = async (dispatch: any, auth: any) => {
  if (!auth.isAuth) {
    console.log("isAuth");
    return;
  }
  const api = createApi(dispatch);
  try {
    const res = await api.get(API_ENDPOINTS.me, { withCredentials: true });

    if (!res) {
      console.log("!res");
      console.log(res);
    } else {
      console.log("DATA loaded");
      dispatch(setUser(res.data));
    }
  } catch (error) {
    console.error(error);
    await refreshToken(dispatch);
  }
};

export const getSteamUser = async (id: string): Promise<ISteamUser> => {
  const res: AxiosResponse<ISteamUser> = await axios.post(
    API_ENDPOINTS.steamid + id
  );
  return res.data;
};
