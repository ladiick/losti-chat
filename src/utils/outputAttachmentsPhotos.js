export const rendersImage = (images, containerWidth) => {
  // const maxWidth = 300;
  // const maxHeight = 200;
  // const minWidth = 50;
  // const minHeight = 100;

  // let myArr = [[]];
  // let a;
  // let tempHeight;
  // let nowWidthRow = [0];
  // let nowRow = 0;

  // for (let i = 0; i < images.length; i++) {
  //   if (images[i].width > maxWidth) {
  //     a = images[i].width;
  //     images[i].width = maxWidth;
  //     tempHeight = (images[i].width / a) * images[i].height;
  //     if (tempHeight > minHeight) {
  //       images[i].height = tempHeight;
  //     }
  //   }

  //   if (images[i].width < minWidth) {
  //     a = images[i].width;
  //     images[i].width = minWidth;
  //     images[i].height = (images[i].width / a) * images[i].height;
  //     if (tempHeight < maxHeight) {
  //       images[i].height = tempHeight;
  //     }
  //   }

  //   a = images[i].height / minHeight;
  //   images[i].height = minHeight;
  //   images[i].width = Math.round(images[i].height * a);

  //   if (nowWidthRow[nowRow] + images[i].width < containerWidth) {
  //     myArr[nowRow].push(images[i]);
  //     nowWidthRow[nowRow] += images[i].width - 2;
  //   } else {
  //     myArr.push([images[i]]);
  //     nowWidthRow.push(images[i].width);
  //     nowRow++;
  //   }
  // }

  // let tempWidth;
  // for (let i = 0; i < myArr.length; i++) {
  //   a = containerWidth - nowWidthRow[i];
  //   for (let k = 0; k < myArr[i].length; k++) {
  //     tempWidth = myArr[i][k].width;
  //     myArr[i][k].width += a * (myArr[i][k]?.width / nowWidthRow?.[i]);
  //     myArr[i][k].height = (myArr[i][k]?.width / tempWidth) * myArr[i][k]?.height;
  //   }
  // }
  // return myArr;
  const maxWidth = 250;
  const maxHeight = 200;
  const minWidth = 50;
  const minHeight = 100;
  const margin = 2; // отступ между фотографиями

  function resizeImage(image) {
    const widthRatio = image.width / maxWidth;
    const heightRatio = image.height / maxHeight;
    const maxRatio = Math.max(widthRatio, heightRatio);

    if (maxRatio > 1) {
      image.width /= maxRatio;
      image.height /= maxRatio;
    }

    const minRatio = Math.min(image.width / minWidth, image.height / minHeight);

    if (minRatio < 1) {
      image.width *= minRatio;
      image.height *= minRatio;
    }
  }

  function splitImagesIntoRows(images, containerWidth) {
    const rows = [[]];
    let currentRowWidth = 0;
    let currentRowIndex = 0;

    for (let i = 0; i < images.length; i++) {
      resizeImage(images[i]);
      const imageWidth = images[i].width + margin;

      if (currentRowWidth + imageWidth <= containerWidth) {
        rows[currentRowIndex].push(images[i]);
        currentRowWidth += imageWidth;
      } else {
        rows.push([images[i]]);
        currentRowIndex++;
        currentRowWidth = imageWidth;
      }
    }

    return rows;
  }

  const rows = splitImagesIntoRows(images, containerWidth);

  // Correct the widths of images within rows to fit the containerWidth
  for (let i = 0; i < rows.length; i++) {
    let totalWidth = rows[i].reduce((acc, image) => acc + image.width, 0);
    let widthDifference = containerWidth - totalWidth - margin * (rows[i].length - 1);
    let widthFactor = widthDifference / totalWidth;

    for (let k = 0; k < rows[i].length; k++) {
      rows[i][k].width += Math.round(rows[i][k].width * widthFactor);
    }
  }

  return rows;
};

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export const outputOfImagesInMessage = (imagesArray, containerWidth) => {
  const arrangedImages = [];

  if (imagesArray.length === 0) {
    return arrangedImages;
  }

  const firstImage = imagesArray[0];

  const isFirstImageWide = firstImage.width > containerWidth;

  let firstImageWidth, firstImageHeight;
  if (imagesArray.length === 1) {
    if (isFirstImageWide) {
      firstImageWidth = containerWidth;
      firstImageHeight = containerWidth / (firstImage.width / firstImage.height);
    } else {
      if (firstImage.height > 300) {
        firstImageWidth = (firstImage.width * 300) / firstImage.height;
        firstImageHeight = 300;
      } else {
        firstImageWidth = firstImage.width;
        firstImageHeight = firstImage.height;
      }
    }
  } else {
    firstImageWidth = isFirstImageWide ? containerWidth : containerWidth / 2.1;
    firstImageHeight = isFirstImageWide ? 220 : 300;
  }

  arrangedImages.push({
    ...firstImage,
    width: firstImageWidth,
    height: firstImageHeight,
  });

  if (isFirstImageWide) {
    for (let i = 1; i < imagesArray.length; i++) {
      const image = imagesArray[i];
      // (containerWidth - 6) минус шесть потому что gap будет 6px
      const countImages = imagesArray.length < 3 ? imagesArray.length : imagesArray.length - 1;
      const imageWidth = (containerWidth - 7) / countImages;
      const imageHeight = 120;
      arrangedImages.push({
        ...image,
        width: imageWidth,
        height: imageHeight,
      });
    }
  } else {
    for (let i = 1; i < imagesArray.length; i++) {
      const countImages = imagesArray.length < 3 ? imagesArray.length : imagesArray.length - 1;
      const imageWidth = firstImageWidth;
      const imageHeight = (300 - 6) / countImages;
      arrangedImages.push({
        ...imagesArray[i],
        width: imageWidth,
        height: imageHeight,
      });
    }
  }

  return arrangedImages;
};
