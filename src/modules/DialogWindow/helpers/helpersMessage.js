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

const filterUniqueMsg = (array) => {
  const uniqueValues = new Set();
  return array.filter((obj) => {
    if (uniqueValues.has(obj.id)) {
      return false;
    }
    uniqueValues.add(obj.id);
    return true;
  });
};

export const addNewMessage = (preMessage, newMessage) => {
  const updateMessages = [...preMessage];
  const newMsgDate = new Date(newMessage.time).toLocaleDateString();
  const existingItem = updateMessages.findIndex((mergedItem) => mergedItem.date === newMsgDate);
  if (existingItem !== -1) {
    updateMessages[existingItem] = {
      ...updateMessages[existingItem],
      messages: filterUniqueMsg([newMessage, ...updateMessages[existingItem].messages]),
    };
  } else {
    updateMessages.push({ date: newMsgDate, messages: [newMessage] });
  }
  return updateMessages;
};
