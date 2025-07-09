import { IAuth } from "@/models/IAuth";

export const getUserId = (str: string): string => {
  const baseUrl = "https://steamcommunity.com/profiles/";

  if (str.startsWith(baseUrl)) {
    const profileId = str.slice(baseUrl.length).replace(`//$/`, "");
    return profileId;
  }
  return str;
};

export const profileURL = (navigate: any, auth: IAuth) => {
  if (auth.role == "VERIFIED") {
    return navigate("/profile/" + auth.id);
  } else return navigate("/profile/createProfile");
};
