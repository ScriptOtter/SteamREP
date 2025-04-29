import { generate } from "random-words";
export const API_AVATAR = () => {
  const API_AVATAR = "https://ui-avatars.com/api/?background=random&name=";
  let words = generate(2);
  return API_AVATAR + words[0] + "+" + words[1];
};
