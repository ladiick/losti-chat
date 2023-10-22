import { useCallback, useState } from "react";

const useImageView = () => {
  const [image, setImage] = useState();

  const onImageChange = useCallback((event) => {
    if (event?.target?.files && event?.target?.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        setImage({
          ...image,
          imagePreview: reader.result,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return [image, onImageChange, setImage];
};

export default useImageView;
