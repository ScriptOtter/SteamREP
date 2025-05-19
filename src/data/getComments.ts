import axios, { AxiosResponse } from "axios";
import { IComment } from "../models/IComment";
import { API_ENDPOINTS } from "../services/apiService";

export const getComments = async (
  id: string
): Promise<AxiosResponse<IComment>> => {
  const res = await axios.get(API_ENDPOINTS.comments + id);
  console.log(res);
  console.log(API_ENDPOINTS.API_URL + id);
  return res.data;
};
