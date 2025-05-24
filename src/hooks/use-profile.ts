import { IAuth } from "@/models/IAuth";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/UserSlice";

export const useProfile = () => {
  const [profile, setProfile] = useState<IAuth>();

  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data === null) {
      setProfile(auth);
    } else {
      const parsedData = JSON.parse(data);
      setProfile(parsedData);
      dispatch(setUser(parsedData));
    }
  }, []);

  return { profile };
};
