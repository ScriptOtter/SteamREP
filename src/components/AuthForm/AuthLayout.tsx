import { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div
        className={"w-full h-full flex items-center justify-center absolute"}
      >
        <div className="w-[400px] rounded-xl">
          <div className="p-4 rounded-xl outline-1 outline-gray-shadow">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
