export const reTime = (time) => {
  const currentTime = new Date();
  const messageTime = new Date(time);

  const arrMonth = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  if (
    currentTime.getDate() === messageTime.getDate() &&
    currentTime.getMonth() === messageTime.getMonth() &&
    currentTime.getFullYear() === messageTime.getFullYear()
  ) {
    return "Cегодня";
  }

  const yesterday = new Date(currentTime);
  yesterday.setDate(currentTime.getDate() - 1);

  if (
    yesterday.getDate() === messageTime.getDate() &&
    yesterday.getMonth() === messageTime.getMonth() &&
    yesterday.getFullYear() === messageTime.getFullYear()
  ) {
    return "Вчера";
  }

  if (currentTime.getFullYear() === messageTime.getFullYear() - 1) {
    return `${messageTime.getDate()} ${
      arrMonth[messageTime.getMonth()]
    } ${messageTime.getFullYear()}`;
  } else {
    return `${messageTime.getDate()} ${arrMonth[messageTime.getMonth()]}`;
  }
};
