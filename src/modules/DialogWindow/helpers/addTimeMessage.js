
export const addTimeMessage2 = (messages=[])=>{

	if (messages.length === 0) {
    return [];
  }

  // Группируем сообщения по дате
  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = new Date(message.time).toDateString();
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});
  console.log("groupedMessages", groupedMessages);
  // Создаем новые объекты со временем для каждой группы сообщений с одинаковой датой
  const newMessages = Object.entries(groupedMessages).reduce((acc, [date, messages]) => {
    // Создаем новый объект с временем и добавляем его в начало группы сообщений
    const newMessage = {
      message: "Время всех сообщений за " + date,
      type: "Date",
      time: new Date(date).toISOString(),
    };
    console.log("messages, newMessage", messages, newMessage);
    acc.push(...messages, newMessage);
    return acc;
  }, []);
  return newMessages;

}

export const addTimeMessage = (messages = []) => {
  if (messages.length === 0) {
    return [];
  }

  // Создаем объект для группировки сообщений по дате
  const groupedMessages = {};

  for (const message of messages) {
    const messageDate = new Date(message.time).toLocaleDateString();

    if (!groupedMessages[messageDate]) {
      groupedMessages[messageDate] = [];
    }

    groupedMessages[messageDate].push(message);
  }

  // Преобразуем объект с группированными сообщениями в массив объектов
  const groupedMessagesArray = Object.entries(groupedMessages)
    .map(([date, messages]) => ({
      date,
      messages,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return groupedMessagesArray;
};