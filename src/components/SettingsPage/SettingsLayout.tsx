import { ReactNode } from "react";

interface Props {
  header: string;
  children: ReactNode;
}
export const SettingsLayout = ({ children, header }: Props) => {
  return (
    <>
      <div className="w-full rounded-t-2xl outline-1 outline-light-gray-2">
        <h1 className={"text-white p-6 text-2xl font-bold"}>{header}</h1>

        {children}
      </div>
    </>
  );
};
