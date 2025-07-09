import { backgroundColors } from "@/styles/colors";
import { Header } from "../views/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div className={backgroundColors.main + "w-full h-screen"}>
        <div className="flex justify-center items-center">
          <div className="bg-gray-800 w-[70%] mt-6">
            <div className="text-white text-2xl">Home</div>
            <div>
              <p className="text-white text-xl">
                Check Steam User Reputation: Report Cheats and Fraud.
              </p>
            </div>
            <div className="flex flex-row justify-between mx-8 space-x-8 pt-4">
              <div className="bg-amber-200 rounded-xl py-4 w-full">
                <p>Отслеживай игроков</p>
                <p>
                  Вы можете закрепить профиль игроков и отслеживать их в
                  реальном времени
                </p>
              </div>
              <div className="bg-amber-200 rounded-xl py-4 w-full">
                <p>Помогай комьюнити</p>
                <p>Пиши комментарии на людей</p>
              </div>
            </div>
            <div className="flex flex-row justify-between mx-8 space-x-8 pt-4">
              <div className="bg-amber-200 rounded-xl py-4 w-full">
                <p>Отслеживай репорты</p>
                <p>Отслеживай репорты на игроков в реальном времени</p>
              </div>
              <div className="bg-amber-200 rounded-xl py-4 w-full">
                <p>Titile</p>
                <p>Description</p>
              </div>
            </div>
            <div>
              <p>Помогай комьюнити</p>
              <div>Оставляй репорты на игроков</div>
              <div>Помечай скамеров</div>
            </div>
          </div>
        </div>
        <footer>asdsadsa</footer>
      </div>
    </>
  );
};
