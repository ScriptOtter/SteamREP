import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader } from "../Loader";

interface IProps {
  title: string;
  disabled?: boolean;
  description?: string;
  valueInput?: string;
  placeholder?: string;
  onClick?: (url: string) => void;
}

export const SettingsProfileItems = ({ ...props }: IProps) => {
  const [input, setInput] = useState<string>(props.valueInput || "");
  const { onClick } = props;

  useEffect(() => {
    setInput(props.valueInput || "");
  }, [props.valueInput]);

  return (
    <>
      <div className="px-6 py-4 relative">
        <div className={"bg-light-gray-2 h-[1px] mb-4"}></div>
        <div className="md:flex space-x-4">
          <div className="md:w-[34%]">
            <p
              className={cn(!props.description && "mt-4", "text-s text-white")}
            >
              {props.title}
            </p>
            <p
              className={cn(
                !props.description ? "mb-4" : "mb-1",
                "text-light-gray-2 text-xs"
              )}
            >
              {props.description}
            </p>
          </div>

          <div
            className={
              "bg-light-gray rounded-md w-full md:w-[420px]" +
              cn(props.onClick ? "text-white" : "text-light-gray-2")
            }
          >
            <input
              placeholder={props.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={props.disabled || false}
              className={
                "py-2 md:py-5 px-4 w-full h-full hover:outline-1 rounded-md placeholder:text-light-gray-3 text-white hover:outline-light-gray focus:outline-blue-active focus:outline-2"
              }
            />
          </div>
        </div>

        {onClick &&
          props.title != "Your email" &&
          input != props.valueInput &&
          input && (
            <div className={"absolute right-8 md:top-12 bottom-4.5"}>
              <button
                onClick={() => {
                  onClick(input);
                }}
                className={
                  "text-white bg-light-gray/20 rounded-md items-center w-full text-s p-1 cursor-pointer"
                }
              >
                <p className="rounded-2xl px-2 bg-light-gray-2/40 cursor-pointer">
                  Save
                </p>

                <Loader />
              </button>
            </div>
          )}
      </div>
    </>
  );
};
