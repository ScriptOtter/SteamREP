import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../services/apiService";
import { ISteamUser } from "../models/ISteamUser";
import { removeUser, setUser } from "@/store/UserSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth";

export const refreshToken = async () => {
  const res = await axios.get(API_ENDPOINTS.refresh, { withCredentials: true });
  console.log("refresh");
  console.log(res);
  return res;
};

export const getMe = async (dispatch: any, auth: any) => {
  if (!auth.isAuth) {
    console.log("isAuth");
    return;
  }
  try {
    const res = await axios.get(API_ENDPOINTS.me, { withCredentials: true });

    if (!res) {
      console.log("!res");
      console.log(res);
    } else {
      console.log("DATA loaded");
      dispatch(setUser(res.data));
    }
  } catch (error) {
    console.error(error);
    const refreshResponse = await refreshToken();
    console.log("refreshResponse");
    console.log(refreshResponse);
    if (refreshResponse) {
      const res = await axios.get(API_ENDPOINTS.me, { withCredentials: true });
      console.log("newRes");
      console.log(res);
      dispatch(setUser(res.data));
    } else {
      removeUser();
    }
  }
};

export const getSteamUser = async (
  id: string
): Promise<AxiosResponse<ISteamUser>> => {
  const res = await axios.post(API_ENDPOINTS.API_URL + id);
  return res.data;
};
