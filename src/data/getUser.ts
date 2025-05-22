import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../services/apiService";
import { ISteamUser } from "../models/ISteamUser";

export const getMe = () => {
  let user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
};

export const getSteamUser = async (
  id: string
): Promise<AxiosResponse<ISteamUser>> => {
  const res = await axios.post(API_ENDPOINTS.API_URL + id);
  return res.data;
};
