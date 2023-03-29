export const changeDeclination = (count,flag) => {
    const count2 = count
    let arrDecl = []
    if(flag==='posFriend') {
        arrDecl = ['общий друг', 'oбщих друга', 'общих друзей']
    }
    if(flag==='message') {
        arrDecl = ['сообщение', 'сообщения', 'сообщений']
    }

    count = Math.abs(count) % 100;
    let num = count % 10;
    if (count > 10 && count < 20) return `${count2} ${arrDecl[2]}`;
    if (num > 1 && num < 5) return `${count2} ${arrDecl[1]}`;
    if (num === 1) return `${count2} ${arrDecl[0]}`;
    return `${count2} ${arrDecl[2]}`;
}