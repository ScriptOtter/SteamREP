import ReactPlayer from "react-player/youtube";

export const YourubeVideo = ({ ...props }) => {
  return (
    <div className={props.className}>
      <ReactPlayer
        width={props.width}
        height={props.height}
        light
        volume={0.05}
        controls
        url={props.youtubeLink}
      />
    </div>
  );
};
