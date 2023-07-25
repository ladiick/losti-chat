export const listItems = (countRequest) => {
	
	return [
    {
      title: "Мои друзья",
      href: `/friends`,
    },
    {
      title: "Заявки в друзья",
      href: `requests`,
      count: countRequest,
    },
    {
      title: "Поиск друзей",
      href: `find`,
    },
  ];
};