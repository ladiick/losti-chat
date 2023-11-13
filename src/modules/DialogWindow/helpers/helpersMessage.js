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

export const isLink = (text) => {
  const urlRegex = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;
  return urlRegex.test(text);
};
export const addProtocolIfMissing = (url, defaultProtocol = "http://") => {
  if (!url.match(/^(http:\/\/|https:\/\/)/i)) {
    return defaultProtocol + url;
  }
  return url;
};

export const resizeImages = (images) => {
  const minWidth = 192;
  const minHeight = 80;
  const maxWidth = 480;
  const maxHeight = 432;

  const resizedImages = [];

  for (const image of images) {
    const { height, width } = image;

    let newHeight = height;
    let newWidth = width;

    // Уменьшаем пропорционально по высоте, если нужно
    if (height > maxHeight) {
      const scale = maxHeight / height;
      newHeight = Math.round(height * scale);
      newWidth = Math.round(width * scale);
    }

    // Уменьшаем пропорционально по ширине, если нужно
    if (newWidth > maxWidth) {
      const scale = maxWidth / newWidth;
      newWidth = Math.round(newWidth * scale);
      newHeight = Math.round(newHeight * scale);
    }

    // Минимальные размеры
    newWidth = Math.max(newWidth, minWidth);
    newHeight = Math.max(newHeight, minHeight);

    resizedImages.push({ ...image, height: newHeight, width: newWidth });
  }
  return resizedImages;
};
