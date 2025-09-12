import { X } from "lucide-react";

export const UploadedImage = ({ ...props }) => {
  const { file } = props;
  const { deleteUploadedImage } = props;
  console.log("файл отображение - ", file);
  return (
    <div className="flex justify-end space-x-1 items-center mb-2">
      <img
        src={URL.createObjectURL(file)}
        className="w-[5%] rounded-lg cursor-pointer hover:blur-[0.5px]"
      />
      <p className="text-blue-200 text-xs">
        {file.name.slice(0, 40) + "..." + file.name.slice(-7)}
      </p>
      <X
        onClick={() => deleteUploadedImage(file)}
        size={18}
        className="mt-1 text-white hover:text-light-blue-2 transition-all duration-100 cursor-pointer"
      />
    </div>
  );
};
