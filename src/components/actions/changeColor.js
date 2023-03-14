export const changeColor = (index) => {

    const arrColor = ['#4bb24b', '#1a73e8', 'red', 'orange']
    return arrColor[index%4]
}