export const Time = (t: string) => {
  const dateTimeString = t;
  const [date, time] = dateTimeString.split("T");
  const formattedDate = date.replace(/-/g, ".");
  const [hours, minutes] = time.split(":");
  return formattedDate + " " + hours + ":" + minutes;
};
