export const PremierRating = ({ ...props }) => {
  return (
    <>
      {!props.rating && (
        <div>
          <div className="relative">
            <img className="w-[80px]" src={"/rating_bg/common.png"} />
            <p className="absolute top-0 left-7 text-[#B1C3D9]">
              {props.rating}
            </p>
          </div>
        </div>
      )}
      {props.rating > 0 && props.rating < 5000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/common.png"} />
          <p className="absolute top-0 left-4 text-[#B1C3D9]">{props.rating}</p>
        </div>
      )}
      {props.rating > 4999 && props.rating < 10000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/uncommon.png"} />
          <p className="absolute top-0 left-4 text-[#5E98D7]">{props.rating}</p>
        </div>
      )}
      {props.rating > 9999 && props.rating < 15000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/rare.png"} />
          <p className="absolute top-0 left-4 text-[#4B69FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 14999 && props.rating < 20000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/mythical.png"} />
          <p className="absolute top-0 left-4 text-[#8846FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 19999 && props.rating < 25000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/legendary.png"} />
          <p className="absolute top-0 left-4 text-[#D22CE6]">{props.rating}</p>
        </div>
      )}
      {props.rating > 24999 && props.rating < 30000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/ancient.png"} />
          <p className="absolute top-0 left-4 text-[#EB4B4B]">{props.rating}</p>
        </div>
      )}
      {props.rating > 29999 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/unusual.png"} />
          <p className="absolute top-0 left-4 text-[#FED700]">{props.rating}</p>
        </div>
      )}
    </>
  );
};

export const PremierRatingInMatch = ({ ...props }) => {
  return (
    <>
      {props.rating == null && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/common.png"} />
          <p className="absolute top-0 left-5 text-xl text-[#B1C3D9] text-bold">
            - - -
          </p>
        </div>
      )}
      {props.rating > 0 && props.rating < 5000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/common.png"} />
          <p className="absolute top-0 left-5 text-xl text-[#B1C3D9]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 4999 && props.rating < 10000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/uncommon.png"} />
          <p className="absolute top-0 left-5 text-xl text-[#5E98D7]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 9999 && props.rating < 15000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/rare.png"} />
          <p className="absolute top-0 left-4.5 text-xl text-[#4B69FF]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 14999 && props.rating < 20000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/mythical.png"} />
          <p className="absolute top-0 left-4.5 text-xl text-[#8846FF]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 19999 && props.rating < 25000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/legendary.png"} />
          <p className="absolute top-0 left-4.5 text-xl text-[#D22CE6]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 24999 && props.rating < 30000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/ancient.png"} />
          <p className="absolute top-0 left-4.5 text-xl text-[#EB4B4B]">
            {props.rating}
          </p>
        </div>
      )}
      {props.rating > 29999 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/unusual.png"} />
          <p className="absolute top-0 left-4.5 text-xl text-[#FED700]">
            {props.rating}
          </p>
        </div>
      )}
    </>
  );
};

export const PremierForMatch = ({ ...props }) => {
  return (
    <>
      {(!props.rating || props.rating === 0) && (
        <div>
          <div className="relative scale-110">
            <img className="w-[80px]" src={"/rating_bg/common.png"} />
            <p className="absolute -top-[1px] left-4.5 text-[#B1C3D9] font-bold">
              - - -
            </p>
          </div>
        </div>
      )}
      {props.rating > 0 && props.rating < 5000 && (
        <div className="relative scale-110">
          <img className="w-[80px]" src={"/rating_bg/common.png"} />
          <p className="absolute top-0 left-4 text-[#B1C3D9]">{props.rating}</p>
        </div>
      )}
      {props.rating > 4999 && props.rating < 10000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/uncommon.png"} />
          <p className="absolute top-0 left-4 text-[#5E98D7]">{props.rating}</p>
        </div>
      )}
      {props.rating > 9999 && props.rating < 15000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/rare.png"} />
          <p className="absolute top-0 left-4 text-[#4B69FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 14999 && props.rating < 20000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/mythical.png"} />
          <p className="absolute top-0 left-4 text-[#8846FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 19999 && props.rating < 25000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/legendary.png"} />
          <p className="absolute top-0 left-4 text-[#D22CE6]">{props.rating}</p>
        </div>
      )}
      {props.rating > 24999 && props.rating < 30000 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/ancient.png"} />
          <p className="absolute top-0 left-4 text-[#EB4B4B]">{props.rating}</p>
        </div>
      )}
      {props.rating > 29999 && (
        <div className="relative">
          <img className="w-[80px]" src={"/rating_bg/unusual.png"} />
          <p className="absolute top-0 left-4 text-[#FED700]">{props.rating}</p>
        </div>
      )}
    </>
  );
};

export const PremierForAnalyzedMatches = ({ ...props }) => {
  return (
    <>
      {(!props.rating || props.rating === 0) && (
        <div>
          <div className="relative">
            <img className="w-[40px] h-6" src={"/rating_bg/common.png"} />
            <p className="absolute -top-[1px] left-4.5 text-[#B1C3D9] font-bold">
              - - -
            </p>
          </div>
        </div>
      )}
      {props.rating > 0 && props.rating < 5000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/common.png"} />
          <p className="absolute top-0 left-3 text-[#B1C3D9]">{props.rating}</p>
        </div>
      )}
      {props.rating > 4999 && props.rating < 10000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/uncommon.png"} />
          <p className="absolute top-0 left-3 text-[#5E98D7]">{props.rating}</p>
        </div>
      )}
      {props.rating > 9999 && props.rating < 15000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/rare.png"} />
          <p className="absolute top-0 left-3 text-[#4B69FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 14999 && props.rating < 20000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/mythical.png"} />
          <p className="absolute top-0 left-3 text-[#8846FF]">{props.rating}</p>
        </div>
      )}
      {props.rating > 19999 && props.rating < 25000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/legendary.png"} />
          <p className="absolute top-0 left-3 text-[#D22CE6]">{props.rating}</p>
        </div>
      )}
      {props.rating > 24999 && props.rating < 30000 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/ancient.png"} />
          <p className="absolute top-0 left-3 text-[#EB4B4B]">{props.rating}</p>
        </div>
      )}
      {props.rating > 29999 && (
        <div className="relative">
          <img className="w-[30px] h-6" src={"/rating_bg/unusual.png"} />
          <p className="absolute top-0 left-3 text-[#FED700]">{props.rating}</p>
        </div>
      )}
    </>
  );
};
