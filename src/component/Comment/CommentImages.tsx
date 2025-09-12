import { X } from "lucide-react";

export const CommentImages = ({ ...props }) => {
  const { image, deteleImage } = props;

  return (
    <div className="flex justify-end space-x-1 items-center mb-2">
      <img
        src={image.url}
        onClick={() => window.open(image.url)}
        className="w-[5%] rounded-lg cursor-pointer hover:blur-[0.5px]"
      />
      <p className="text-blue-200 text-xs">{image.url.split("/")[4]}</p>
      <X
        onClick={() => deteleImage(image.id)}
        size={18}
        className="mt-1 text-white hover:text-light-blue-2 transition-all duration-100 cursor-pointer"
      />
    </div>
  );
};
