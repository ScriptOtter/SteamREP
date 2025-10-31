import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { Footer } from "@/views/Footer";
import { Header } from "@/views/Header";

export const BlogPage = () => {
  const updates = [
    {
      version: "1.0.0",
      date: "01.11.2025",
      type: "Global Update",
      description: "Welcome to SteamRep! Основные фишки сайта.",

      featureGroups: [
        {
          title: "Взаимодействие с платформой Steam",
          features: [
            "Удобное получение идентификаторов пользователей, включая SteamID, SteamID2, SteamID3 и SteamID64Hex",
            "Возможность оставлять и отслеживать подлинные комментарии к профилям пользователей, включая закрытые аккаунты",
            "Мониторинг игровых и торговых блокировок пользователей",
          ],
        },
        {
          title: "Взаимодействие с CS2",
          features: [
            "Отслеживание приватных рангов, лайков и медалей игроков непосредственно с нашего веб-сайта",
            "Доступ к статистическим данным последних матчей, включая ранги, рейтинг и информацию о стрельбе",
            "Отправка репортов на игровые профили Steam с приложением доказательств",
          ],
        },
        {
          title: "Дополнительные возможности",
          features: [
            "Ежедневная проверка нашей базы данных аккаунтов Steam на наличие VAC-блокировок",
            "Сохранение и мониторинг Steam-аккаунтов в едином удобном месте",
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Header />
      <div className={"flex justify-center mb-[15%]"}>
        <Container>
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-white ">
              Последние обновления и новые функции
            </h1>
            {updates.map((update) => (
              <div
                key={update.version}
                className={cn(
                  update.type.includes("Глобальное")
                    ? "border-blue-600"
                    : "border-green-500",
                  "mb-8 border-l-4 p-4 rounded-lg outline-1 outline-light-gray-2 "
                )}
              >
                <h2 className="text-3xl font-semibold text-white ">{`${update.type} ${update.version} - ${update.date}`}</h2>
                <p className="text-purple-active mt-2 text-xl font-semibold">
                  {update.description}
                </p>
                <ul className="list-disc list-inside mt-2 text text-white">
                  {update.featureGroups.map((data) => (
                    <div className="mb-2">
                      <p className="text-xl font-semibold mb-1">{data.title}</p>
                      {data.features.map((feature, index) => (
                        <li className="text-[16px]" key={index}>
                          {feature}
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
