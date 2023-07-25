export const changeColor = () => {
    const randomNumber = Math.ceil(Math.random() * 3)
    const arrColor = ['#4bb24b', '#1a73e8', 'red', 'orange']
    return arrColor[randomNumber];
}