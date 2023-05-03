export const rendersImage = (images, sizeContainer) => {
	const maxWidth = 350
	const maxHeight = 250
	const minWidth = 50
	const minHeight = 100
	let myArr = [[]]
	let a
	let tempHeight
	let nowWidthRow = [0]
	let nowRow = 0

	for (let i = 0; i < images.length; i++) {
		if (images[i].width > maxWidth) {
			a = images[i].width
			images[i].width = maxWidth
			tempHeight = (images[i].width / a) * images[i].height
			if (tempHeight > minHeight) {
				images[i].height = tempHeight
			}
		}

		if (images[i].width < minWidth) {
			a = images[i].width
			images[i].width = minWidth
			images[i].height = (images[i].width / a) * images[i].height
			if (tempHeight < maxHeight) {
				images[i].height = tempHeight
			}
		}

		a = images[i].height / minHeight
		images[i].height = minHeight
		images[i].width = Math.round(images[i].height * a)

		if (nowWidthRow[nowRow] + images[i].width < sizeContainer) {
			myArr[nowRow].push(images[i])
			nowWidthRow[nowRow] += images[i].width - 2
		} else {
			myArr.push([images[i]])
			nowWidthRow.push(images[i].width)
			nowRow++
		}
	}

	let tempWidth
	for (let i = 0; i < myArr.length; i++) {
		a = sizeContainer - nowWidthRow[i]
		for (let k = 0; k < myArr[i].length; k++) {
			tempWidth = myArr[i][k].width
			myArr[i][k].width += a * (myArr[i][k]?.width / nowWidthRow?.[i])
			myArr[i][k].height = (myArr[i][k]?.width / tempWidth) * myArr[i][k]?.height

		}
	}
	return myArr
}


export const outputOfImagesInMessage = (images, sizeContainer) => {

	const maxWidth = structuredClone(sizeContainer)
	const maxHeight = 300
	const minWidth = 36
	const minHeight = 16
	let ratio

	let arrayImages = structuredClone(images)


	if (arrayImages[0].width > maxWidth) {
		arrayImages[0].width = maxWidth
		ratio = Math.min(maxWidth / arrayImages[0].width, maxHeight / arrayImages[0].height);
		if (arrayImages[0].height > minHeight) {
			arrayImages[0].height *= ratio / 1.3
		}
	}


	for (let index = 1; index < arrayImages.length; index++) {


		if (arrayImages[index].width > maxWidth) {
			arrayImages[index].width = maxWidth / 2.04

			ratio = Math.min(maxWidth / arrayImages[index].width, maxHeight / arrayImages[index].height);

			if (arrayImages[index].height > minHeight) {
				arrayImages[index].height *= ratio / 1.3
			}
		}

		if (arrayImages[index].width < minWidth) {
			arrayImages[index].width = minWidth

			ratio = Math.min(maxWidth / arrayImages[index].width, maxHeight / arrayImages[index].height);

			if (arrayImages[index].height > minHeight) {
				arrayImages[index].height *= ratio / 1.3
			}

		}







		// arrayImages[index].height *= ratio
		// if (arrayImages[index].width > maxWidth) {
		// 	tempVar = arrayImages[index].width
		// 	arrayImages[index].width = maxWidth
		// 	tempHeight = (arrayImages[index].width / tempVar) * arrayImages[index].height
		// 	if (tempHeight > minHeight) {
		// 		arrayImages[index].height = tempHeight
		// 	}
		// }


	}

	return arrayImages

}


