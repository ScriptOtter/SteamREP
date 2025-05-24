import { API_ENDPOINTS } from "@/services/apiService";
import { removeUser } from "@/store/UserSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    navigate("/");
    dispatch(removeUser());
    await axios.get(API_ENDPOINTS.logout, { withCredentials: true });
  };
  return { handleLogout };
};
