import { createCookie, createCookieSessionStorage } from "react-router-dom";
import { API_ENDPOINTS } from "../services/apiService";
import axios, { AxiosError, AxiosHeaderValue, AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

interface ISignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  isChecked: boolean;
}

export const Register = async (formData: ISignUp) => {
  const { isChecked, ...data } = formData;
  console.log(data);
  const res = await axios.post(API_ENDPOINTS.signup, data);
  if (!res) {
    console.log("TRY AGAIN!");
  }
  console.log(res);
};
