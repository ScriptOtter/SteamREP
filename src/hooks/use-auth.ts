import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Импортируйте RootState из вашего store
import { IAuth } from "@/models/IAuth";

export function useAuth(): IAuth {
  const { id, username, avatar, isAuth, role } = useSelector(
    (state: RootState) => state.user
  );

  return {
    isAuth,
    id,
    avatar,
    username,
    role,
  };
}
