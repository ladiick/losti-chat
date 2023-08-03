import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import s from "./DialogWindow.module.scss";
import Communication from "./components/Communication/Communication";

import { useGetCurrentPersonQuery } from "../../components/features/currentPeopleApiSlice";
import useMatchMedia from "../../components/hooks/useMatchMedia";

import Text from "../../components/ui/Text/Text";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import { openModalBlock, setOpenDetailedImage } from "../../redux/slices/navigationSlice";

import { IoChatbubblesSharp } from "react-icons/io5";
import AttachmentsInDialogs from "../AllModals/AttachmentsInDialogs/AttachmentsInDialogs";
import DetailedImage from "../AllModals/AttachmentsInDialogs/components/DetailedImage/DetailedImage";
import ViewForwardedMessage from "../AllModals/ViewForwardedMessage/ViewForwardedMessage";
import BlockInputs from "./components/BlockInputs/BlockInputs";
import DragAndDropFileUpload from "./components/DragAndDropFileUpload/DragAndDropFileUpload";
import HeaderChat from "./components/HeaderChat/HeaderChat";
import HeaderForwardMessage from "./components/HeaderForwardMessage/HeaderForwardMessage";

const Chat = () => {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [skip, setSkip] = useState(true)
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const viewForwardMessage = useSelector((state) => state.navigation.modal.viewForwardMessage);
  const viewDetailedImage = useSelector((state) => state.navigation.openDetailedImage);

  const viewAttachmentsInDialogs = useSelector((state) => state.navigation.modal.viewAttachmentsInDialogs);

  const { isMobile } = useMatchMedia();

  const { data: peopleCurrent = {}, isLoading } = useGetCurrentPersonQuery(searchParams.get("dialogs"), {
    skip: searchParams?.get("dialogs") && myId ? (searchParams?.get("dialogs") == String(myId) ? true : false) : true,
  });

  useEffect(() => {
    if (searchParams?.has("photo") && searchParams?.has("history")) {
      dispatch(setOpenDetailedImage(true));
    }

    if (searchParams?.has("history")) {
      dispatch(
        openModalBlock({
          viewAttachmentsInDialogs: true,
          viewForwardMessage: false,
        }),
      );
    }
    // dispatch(openModalBlock(
    // 	searchParams?.has('history') ? {
    // 		viewAttachmentsInDialogs: true,
    // 		viewForwardMessage: false
    // 	} : {viewForwardMessage: false})
    // )
    const onKeypress = (e) => {
      if (e.code === "Escape") {
        setSearchParams("");
      }
    };

    document?.addEventListener("keydown", onKeypress);

    return () => {
      document?.removeEventListener("keydown", onKeypress);
    };
  }, [searchParams?.get("dialogs")]);

  if (!searchParams.get("dialogs") && !isMobile) {
    return (
      <WrapperBlocks className={s.emptity__chat}>
        <div className={s.emptity__content}>
          <IoChatbubblesSharp size={56} color="var(--text--accent)" />
          <Text style={{ marginTop: 10 }}>Выберите чат</Text>
        </div>
      </WrapperBlocks>
    );
  }

  return (
    <WrapperBlocks className={s.wrapper}>
      <HeaderChat myId={myId} isLoading={isLoading} peopleCurrent={peopleCurrent} />

      <DragAndDropFileUpload style={{ display: "contents" }}>
        <Communication />

        {currentMessage?.[searchParams.get("dialogs")]?.length && isMobile ? <HeaderForwardMessage /> : <BlockInputs />}
      </DragAndDropFileUpload>

      {viewForwardMessage && <ViewForwardedMessage />}
      {viewAttachmentsInDialogs && <AttachmentsInDialogs />}
      {viewDetailedImage && <DetailedImage />}
    </WrapperBlocks>
  );
};

export default React.memo(Chat);
