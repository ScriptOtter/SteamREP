import { IWeaponStats } from "@/models/ICS2Stats";
import { GunStatisiticProfile } from "../Match/GunStatisitcPlayer";
interface Props {
  weapons: IWeaponStats[];
}
export const CS2WeaponsStatistics = ({ ...props }: Props) => {
  const { weapons } = props;
  return (
    <>
      <p>Weapons Statistics</p>
      <div className="mx-2">
        <div className=" border-b-1 w-full border-light-gray">
          <div className="items-center grid grid-cols-11 text-[8px] xl:text-[14px] gap-12 md:gap-0">
            <div className="col-start-4 xl:ml-0 md:ml-2 ml-1">Accuracy</div>
            <div className="ml-3 md:ml-4.5 xl:ml-2.5">Head</div>
            <div className="ml-2.5 md:ml-4.5 xl:ml-2.5">Chest</div>
            <div className="ml-1 md:ml-3.5 xl:ml-1">Stomach</div>
            <div className="ml-4 md:ml-5 xl:ml-3.5">Arm L</div>
            <div className="ml-4 md:ml-5 xl:ml-3">Arm R</div>
            <div className="ml-3.5 md:ml-6 xl:ml-4">Leg L</div>
            <div className="ml-4 md:ml-6.5 xl:ml-4.5">Leg R</div>
          </div>
        </div>
      </div>
      <GunStatisiticProfile weapons={weapons} />
    </>
  );
};
