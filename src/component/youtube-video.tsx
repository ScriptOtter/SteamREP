import ReactPlayer from "react-player/youtube";

export const YourubeVideo = ({ ...props }) => {
  return (
    <div className="flex border-orange-500 border-1 w-[400px]">
      <ReactPlayer
        width={400}
        height={225}
        light
        volume={0.05}
        controls
        url={props.youtubeLink}
      />
    </div>
  );
};
