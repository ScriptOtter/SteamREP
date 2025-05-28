import axios from "axios";
import { IComment } from "../models/IComment";
import { API_ENDPOINTS } from "../services/apiService";

export const getComments = async (id: string): Promise<IComment[]> => {
  const res = await axios.get(API_ENDPOINTS.comments + id);
  return res.data;
};
