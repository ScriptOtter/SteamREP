export const PremierRating = ({ ...props }) => {
  return (
    <>
      {props.rating == null && (
        <div>
          <p className="">No Rating</p>
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
