export function timeAgo(unixtime: number) {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const secondsElapsed = now - unixtime;

  if (secondsElapsed < 60) {
    return "just now"; // If less than a minute has passed
  } else if (secondsElapsed < 3600) {
    // Less than an hour
    const minutes = Math.floor(secondsElapsed / 60);
    return `${minutes} ${getMinuteWord(minutes)} ago`;
  } else if (secondsElapsed < 86400) {
    // Less than a day
    const hours = Math.floor(secondsElapsed / 3600);
    return `${hours} ${getHourWord(hours)} ago`;
  } else {
    // More than a day
    const days = Math.floor(secondsElapsed / 86400);
    return `${days} ${getDayWord(days)} ago`;
  }
}

function getMinuteWord(minutes: number) {
  if (minutes === 1) {
    return "minute";
  } else {
    return "minutes";
  }
}

function getHourWord(hours: number) {
  if (hours === 1) {
    return "hour";
  } else {
    return "hours";
  }
}

function getDayWord(days: number) {
  if (days === 1) {
    return "day";
  } else {
    return "days";
  }
}
