const URL = import.meta.env.VITE_SERVER_URL;

export const API_ENDPOINTS = {
  API_URL: URL,
  signin: URL + "auth/signin",
  signup: URL + "auth/signup",
  logout: URL + "auth/logout",
  refresh: URL + "auth/refresh",
  commentCreate: URL + "comment/create/",
  commentDelete: URL + "comment/",
  commentUpdate: URL + "comment/",
  comments: URL + "comments/",
  steamid: URL + "steam/",
  profile: URL + "profile",
  me: URL + "profile/me",
};
