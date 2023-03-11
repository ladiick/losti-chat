export const reTime = (time) => {
    const currentTime = new Date()
    const messageTime = new Date(time)

    const arrMonth = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

    if (currentTime.getDate() === messageTime.getDate()) {
        return 'Cегодня'
    }

    if (currentTime.getDate() - 1 === messageTime.getDate()) {
        return 'Вчера'
    }
    if (currentTime.getDate() !== messageTime.getDate()) {
        return `${messageTime.getDate()} ${arrMonth[messageTime.getMonth()]}`
    }
    if (currentTime.getFullYear() !== messageTime.getFullYear()) {
        return `${messageTime.getDate()} ${arrMonth[messageTime.getMonth()]} ${messageTime.getFullYear()}}`
    }

    return 'Дата не корректна'
}
