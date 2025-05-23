const URL = import.meta.env.VITE_SERVER_URL;

export const API_ENDPOINTS = {
  API_URL: URL,
  signin: URL + "auth/signin",
  signup: URL + "auth/signup",
  logout: URL + "auth/logout",
  refresh: URL + "auth/refresh",
  commentCreate: URL + "comment/create/",
  comments: URL + "comments/",
  profile: URL + "profile",
  me: URL + "profile/me",
};
