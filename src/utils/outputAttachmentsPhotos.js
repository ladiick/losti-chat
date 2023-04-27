export const rendersImage = (images, sizeContainer) => {


	const container = sizeContainer
	const maxWidth = 350
	const maxHeight = 250
	const minWidth = 50
	const minHeight = 100
	let my_arr = [[]]
	let a
	let temp_height
	let now_width_row = [0]
	let now_row = 0

	for (let i = 0; i < images.length; i++) {
		if (images[i].width > maxWidth) {
			a = images[i].width
			images[i].width = maxWidth
			temp_height = (images[i].width / a) * images[i].height
			if (temp_height > minHeight) {
				images[i].height = temp_height
			}
		}

		if (images[i].width < minWidth) {
			a = images[i].width
			images[i].width = minWidth
			images[i].height = (images[i].width / a) * images[i].height
			if (temp_height < maxHeight) {
				images[i].height = temp_height
			}
		}

		a = images[i].height / minHeight
		images[i].height = minHeight
		images[i].width = Math.round(images[i].height * a)

		if (now_width_row[now_row] + images[i].width < container) {
			my_arr[now_row].push(images[i])
			now_width_row[now_row] += images[i].width
		} else {
			my_arr.push([images[i]])
			now_row++
			now_width_row.push(images[i].width)
		}
	}

	let temp_width
	for (let i = 0; i < my_arr.length; i++) {
		a = container - now_width_row[i]
		for (let k = 0; k < my_arr[i].length; k++) {
			temp_width = my_arr[i][k].width
			my_arr[i][k].width += a * (my_arr[i][k].width / now_width_row[i])
			my_arr[i][k].height = (my_arr[i][k].width / temp_width) * my_arr[i][k].height

		}
	}

	return my_arr
}

