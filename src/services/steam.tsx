import axios from "axios";
import { HTMLAttributes } from "react";

export const SteamId = async () => {
  var options = {
    method: "GET",
    url: "https://steamid.pro/ru/lookup/76561198117401376",
  };

  const res = await axios
    .request(options)
    .then(function (response) {
      console.log(response);
      console.log("good");
    })
    .catch(function (error) {
      console.error(error);
    });
  return res;
};
