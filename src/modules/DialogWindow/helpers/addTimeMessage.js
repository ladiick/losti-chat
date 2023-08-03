
export const addTimeMessage = (messages=[])=>{

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

  // Создаем новые объекты со временем для каждой группы сообщений с одинаковой датой
  const newMessages = Object.entries(groupedMessages).reduce((acc, [date, messages]) => {
    // Вычисляем общее время для группы сообщений
    const totalTime = messages.reduce((sum, message) => sum + Date.parse(message.time), 0);
    // Создаем новый объект с временем и добавляем его в начало группы сообщений
    const newMessage = {
      message: "Время всех сообщений за " + date,
      type: "Date",
      time: new Date(totalTime).toISOString(),
    };

    acc.push(...messages, newMessage);
    return acc;
  }, []);
  return newMessages;

}