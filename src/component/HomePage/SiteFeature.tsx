import { backgroundColors, textColors } from "@/styles/colors";
import { fontSize } from "@/styles/font";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const SiteFeature = ({ ...props }: Props) => {
  const { title, description, image } = props;
  return (
    <div
      className={textColors.white + backgroundColors.lightMain + "py-2 my-2"}
    >
      <div className="flex md:flex-row flex-col justify-between mx-8 space-x-8 pt-4">
        <div className="md:flex-1/2 rounded-xl py-4 w-full">
          <p className={fontSize.medium + "mb-4"}>{title}</p>
          <p className={fontSize.smallMd}>{description}</p>
        </div>
        <div className="md:flex-1/2">
          {image && <img className="" src={image} />}
        </div>
      </div>
    </div>
  );
};
