import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const SiteFeature = ({ ...props }: Props) => {
  const { title, description, icon } = props;
  return (
    <div className="mx-2.5 bg-light-gray/40 hover:bg-light-blue transition-all duration-200 py-2 rounded-xl outline-2 outline-light-gray-2 md:w-[311px] w-[280px] h-[200px]">
      <div className="bg-secondary/50 rounded-xl m-4 p-1 w-fit text-light-gray-3">
        {icon}
      </div>
      <div className="text-white mx-4 text-[18px] mb-2">
        <p>{title}</p>
      </div>
      <div className="text-white mx-4 text-[14px] mb-2">
        <p>{description}</p>
      </div>
    </div>
  );
};
