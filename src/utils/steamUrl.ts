import { IAuth } from "@/models/IAuth";

export const getUserId = (str: string): string => {
  const baseUrl = "https://steamcommunity.com/profiles/";
  const baseUrl2 = "https://steamcommunity.com/id/";

  if (str.startsWith(baseUrl)) {
    const profileId = str.slice(baseUrl.length).replace(`//$/`, "");
    return profileId;
  }
  if (str.startsWith(baseUrl2)) {
    const profileId = str.slice(baseUrl2.length).replace(`//$/`, "");
    return profileId;
  }
  return str;
};

export const profileURL = (navigate: any, auth: IAuth) => {
  if (auth.role == "VERIFIED") {
    return navigate("/profile/" + auth.id);
  } else return navigate("/profile/createProfile");
};
