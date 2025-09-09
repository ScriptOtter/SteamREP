import { Header } from "../views/Header";
import { Container } from "@/component/container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "@/services/apiService";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getMe } from "@/data/getUser";
import { useAuth } from "@/hooks/use-auth";
import { setUser } from "@/store/UserSlice";

import { FeaturesHomePage } from "@/component/FeaturesHomePage";

export const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      console.log(token);
      const res = await axios.patch(API_ENDPOINTS.verificationEmail, null, {
        params: {
          token,
          // Добавьте другие параметры, если необходимо
        },
        withCredentials: true,
      });
      if (res) {
        console.log(res);
        dispatch(setUser(res.data));
        getMe(dispatch, auth);
        toast.success("Emain verified!", res.data);
      }
    };
    if (token) verify();
    navigate("/");
  }, [token]);
  return (
    <>
      <div className="h-full min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:26px_26px] backdrop-blur-2xl">
        <Header />

        <div className="flex justify-center">
          <Container className="">
            <div className="flex justify-center items-center inset-0 w-full md:mt-24 transition-all duration-300 ">
              <div>
                <div className="pb-8 ">
                  <div className="text-white">
                    <p className="text-5xl md:text-6xl text-center mb-4 md:mb-2 fade-in-home-text-1">
                      Become a part of our community
                    </p>
                    <p className="text-3xl md:text-4xl text-center mb-2 md:mb-2.5 text-light-blue-3 fade-in-feature">
                      Influence the reputation of Steam users
                    </p>
                    <div className="flex justify-center items-center">
                      <p className="md:w-[55%] text-md text-center mb-6 font-semibold text-light-gray-2 fade-in-home-text-2">
                        Steamrep is a unique site that allows you to track the
                        real reputation of a Steam user
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 text-xl text-white">
                    <button
                      onClick={() => navigate("/auth/signup")}
                      className="py-1 px-12 cursor-pointer bg-light-blue hover:bg-light-blue-2 rounded-xl outline-1 outline-light-gray hover:outline-light-gray-2"
                    >
                      Join in
                    </button>
                    <button
                      onClick={() => navigate("/blog")}
                      className="py-1 px-9.5 cursor-pointer bg-light-gray hover:bg-light-gray-2 rounded-xl outline-1 outline-light-gray hover:outline-light-gray-2"
                    >
                      About Us
                    </button>
                  </div>
                </div>
                <FeaturesHomePage />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
