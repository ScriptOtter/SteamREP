import { API_ENDPOINTS } from "@/services/apiService";
import { createApi } from "@/services/axios";

export const saveSocialLinks = async (
  site: string,
  url: string,
  dispatch: any
) => {
  const api = createApi(dispatch);
  try {
    const res = await api.patch(
      API_ENDPOINTS.patchSocialLinks,
      { site: site, url: url },
      { withCredentials: true }
    );

    if (!res) {
      return false;
    }
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
