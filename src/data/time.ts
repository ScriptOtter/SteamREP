export const Time = (t: string) => {
  const dateTimeString = t;
  const [date, time] = dateTimeString.split("T");
  const formattedDate = date.replace(/-/g, ".");
  const [hours, minutes] = time.split(":");
  return formattedDate + " " + hours + ":" + minutes;
};

export function isoDateToString(isoDateString: Date): string {
  // Проверяем, является ли строка валидной
  if (!isoDateString || typeof isoDateString !== "string") {
    throw new Error("Invalid date string");
  }

  // Преобразуем строку в объект Date
  const date = new Date(isoDateString);

  // Проверяем, является ли date валидным объектом Date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Получаем год, месяц и день
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const day: string = String(date.getDate()).padStart(2, "0");

  // Форматируем дату в нужный вид
  return `${year}-${month}-${day}`;
}

// Пример использования
const isoDateString: string = "2025-10-16T21:00:00.368Z";
try {
  const formattedDate: string = isoDateToString(isoDateString);
  console.log(formattedDate); // Вывод: "2025-10-16"
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error");
}
