import { useState } from "react";
import { VerdictDemos } from "./verdict-demo";
import { useDropDownMenu } from "@/hooks/use-drop-down-menu";
import { HeaderOverwatch } from "./ui/HeaderOverwatch";
import { OverwatchItem } from "./overwatchItem";

export const OverwatchSideBar = () => {
  return (
    <>
      <HeaderOverwatch />
      <OverwatchItem />
      <OverwatchItem />
      <OverwatchItem />
      <OverwatchItem />
    </>
  );
};
