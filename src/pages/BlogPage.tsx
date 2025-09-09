import { Container } from "@/component/container";
import { cn } from "@/lib/utils";
import { Header } from "@/views/Header";

export const BlogPage = () => {
  const updates = [
    {
      version: "1.0.0",
      date: "15 октября 2023",
      type: "Глобальное обновление",
      description:
        "В этом обновлении мы добавили несколько новых функций, которые улучшат ваш опыт использования нашего приложения.",

      featureGroups: [
        {
          title: "Новая панель управления",
          features: [
            "Интуитивно понятный интерфейс.",
            "Оптимизация производительности для более быстрой загрузки страниц.",
          ],
        },
        {
          title: "Поддержка темной темы",
          features: ["Комфортное чтение в ночное время."],
        },
      ],
    },
    {
      version: "1.1.0",
      date: "1 ноября 2023",
      type: "Стандартное обновление",
      description:
        "Мы рады представить вам несколько улучшений, которые сделают ваше взаимодействие с приложением еще более приятным.",

      featureGroups: [
        {
          title: "Функция поиска по контенту",
          features: [
            "Интеграция с популярными социальными сетями для быстрого обмена информацией.",
          ],
        },
        {
          title: "Улучшенная система уведомлений",
          features: ["Актуальная информация для пользователей."],
        },
      ],
    },
    {
      version: "1.2.0",
      date: "15 ноября 2023",
      type: "Глобальное обновление",
      description:
        "Это обновление фокусируется на безопасности и стабильности работы приложения.",

      featureGroups: [
        {
          title: "Улучшенная безопасность",
          features: [
            "Система шифрования данных пользователей.",
            "Регулярные обновления безопасности для защиты от уязвимостей.",
          ],
        },
        {
          title: "Оптимизация работы сервера",
          features: ["Повышение надежности приложения."],
        },
      ],
    },
    {
      version: "1.3.0",
      date: "1 декабря 2023",
      type: "Стандартное обновление",
      description:
        "Мы продолжаем работать над улучшением пользовательского опыта, и это обновление не исключение.",
      featureGroups: [
        {
          title: "Новые функции на основе отзывов пользователей",
          features: [
            "Новая система обратной связи для пользователей.",
            "Добавлены новые языковые пакеты для интернационализации.",
            "Оптимизация интерфейса для мобильных устройств.",
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Header />
      <div className={"flex justify-center"}>
        <Container>
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              Последние обновления и новые функции
            </h1>
            {updates.map((update) => (
              <div
                key={update.version}
                className={cn(
                  update.type.includes("Глобальное")
                    ? "border-blue-600"
                    : "border-green-500",
                  "mb-8 border-l-4 p-4 rounded-lg outline-1 outline-light-gray-2"
                )}
              >
                <h2 className="text-2xl font-semibold text-white">{`${update.type} ${update.version} - ${update.date}`}</h2>
                <p className="text-purple-active mt-2 text-[18px]">
                  {update.description}
                </p>
                <ul className="list-disc list-inside mt-2 text-white">
                  {update.featureGroups.map((data) => (
                    <div className="mb-1">
                      <p className="text-[18px]">{data.title}</p>
                      {data.features.map((feature, index) => (
                        <li className="" key={index}>
                          {feature}
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            ))}
            <footer className="mt-10 text-center text-gray-500">
              <p>
                Спасибо, что остаётесь с нами! Следите за новыми обновлениями!
              </p>
            </footer>
          </div>
        </Container>
      </div>
    </>
  );
};
