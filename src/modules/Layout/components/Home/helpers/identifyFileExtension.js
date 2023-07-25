export const identifyFileExtension = (files) => {
  const imageExtensions = "image";
  const documentExtensions = ["application", "text"];

  if (files.length === 1) {
    const itIsImage = files[0].type.includes(imageExtensions);
    const itIsDocument = documentExtensions.some((ext) => files[0].type.includes(ext));

		if (itIsImage) {
			return 'image'
    }
		if (itIsDocument) {
			return 'document'
    }
  } else {
    let image = false;
    let document = false;
    for (let i = 0; i < files.length; i++) {
      const file = files[i].type;

      for (let j = 0; j < files.length; j++) {
        if (file.includes(documentExtensions[j])) {
          document = true;
        }
        if (file.includes(imageExtensions)) {
          image = true;
        }
      }
    }

		if ((image && document) || document) {
			return "document";
		} else if (image) {
			return "image";
    }
  }
};
