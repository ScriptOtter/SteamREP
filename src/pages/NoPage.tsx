import { Header } from "@/views/Header";

export const NoPage = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-full">
        <div className="flex flex-col items-center font-mono space-y-2 mt-[10%]">
          <p className="text-white text-7xl sm:text-9xl">404</p>
          <p className="text-white text-5xl sm:text-7xl">PAGE NOT FOUND!</p>
        </div>
      </div>
    </div>
  );
};
