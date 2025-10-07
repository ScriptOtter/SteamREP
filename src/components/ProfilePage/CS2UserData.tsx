import { IGC } from "@/models/IGC";
import { API_ENDPOINTS } from "@/services/apiService";
import axios from "axios";
import { useEffect, useState } from "react";
import { Medal } from "./Medal";
import { CS2ProgressBar } from "./CS2ProgressBar";
import { CS2Commendation } from "./CS2Commendation";

export const CS2UserData = ({ ...props }) => {
  const [cs2UserData, setCS2UserData] = useState<IGC>();
  const { id } = props;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(API_ENDPOINTS.getCS2AccountData, {
        steamid: id,
      });
      setCS2UserData(res.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {cs2UserData?.player_cur_xp && (
        <CS2ProgressBar
          currentLevel={cs2UserData.player_level}
          currentXp={cs2UserData?.player_cur_xp - 327680000}
        />
      )}
      {cs2UserData?.commendation && (
        <>
          <div className="text-white mt-2 text-md">CS2 Commendations</div>

          <CS2Commendation
            friendly={cs2UserData?.commendation?.cmd_friendly}
            teaching={cs2UserData?.commendation?.cmd_teaching}
            leader={cs2UserData?.commendation?.cmd_leader}
          />
        </>
      )}
      {cs2UserData?.medals && (
        <div className="text-white mt-2 text-md mb-2">CS2 Medals</div>
      )}
      <div className="grid grid-cols-8 md:grid-cols-5 gap-y-2">
        {cs2UserData?.medals?.display_items_defidx?.map((medal) => (
          <Medal medal={medal} />
        ))}
      </div>
    </div>
  );
};
