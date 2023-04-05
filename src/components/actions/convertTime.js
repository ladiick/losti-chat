export const convertTime = (time)=>{

    const messageTime = new Date(time)

    if (messageTime.getHours() < 10) {
        if (messageTime.getMinutes() < 10) {
            return `0${messageTime.getHours()}:0${messageTime.getMinutes()}`
        }
        return `0${messageTime.getHours()}:${messageTime.getMinutes()}`
    }

    if (messageTime.getMinutes() < 10) {
        if(messageTime.getHours()<10){
            return `0${messageTime.getHours()}:0${messageTime.getMinutes()}`
        }
        return `${messageTime.getHours()}:0${messageTime.getMinutes()}`
    }
    return `${messageTime.getHours()}:${messageTime.getMinutes()}`
}