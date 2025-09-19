import { ReactNode } from "react";

interface Props {
  header: string;
  children: ReactNode;
}
export const SettingsLayout = ({ children, header }: Props) => {
  return (
    <>
      <div className="w-full rounded-t-2xl outline-1 outline-light-gray-2">
        <div className="bg-light-gray rounded-t-2xl">
          <h1 className={"text-white p-6 text-xl font-bold"}>{header}</h1>
        </div>
        {children}
      </div>
    </>
  );
};
