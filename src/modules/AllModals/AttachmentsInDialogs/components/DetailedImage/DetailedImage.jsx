import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetImageInMessageQuery } from "../../../../../components/features/getImageInMessageApiSlice";
import { setOpenDetailedImage } from "../../../../../redux/slices/navigationSlice";
import { variantsAnimationModal } from "../../../../../utils/variantsAnimationModal";
import s from "./DetailedImage.module.scss";

const DetailedImage = () => {
  const open = useSelector((state) => state.navigation.openDetailedImage);
  const openFromDialog = useSelector((state) => state.navigation.openFromDialog);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: imageSrc, isLoading } = useGetImageInMessageQuery(searchParams?.get("photo"), {
    skip: !searchParams?.get("photo"),
  });

  const closeFunc = () => {
    if (openFromDialog) {
      searchParams.delete("history");
      searchParams.delete("photo");
    } else {
      searchParams.delete("photo");
    }
    setSearchParams(searchParams);
    dispatch(setOpenDetailedImage(false));
  };
  return (
    <AnimatePresence>
      <Dialog as="div" initialFocus={false} open={open} onClose={closeFunc}>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
          variants={variantsAnimationModal}
          className={"dialog__overlay"}
        >
          <Dialog.Panel className={s.wrapper__content}>
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "var(--background--content)",
                  borderRadius: "var(--borderRadiusBlock)",
                }}
              >
                {/* <LoaderWrapper>
                  <Loader visible={isLoading} />
                </LoaderWrapper> */}
              </div>
            ) : (
              <img src={imageSrc} className={s.detailed__image} alt={""} />
            )}
          </Dialog.Panel>
          {/* <CloseButton style={styleCloseBtn} onClick={closeFunc} /> */}
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
};

export default DetailedImage;
