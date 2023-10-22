import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Communication from "./components/Communication/Communication";

import { useGetCurrentPersonQuery } from "../../components/features/currentPeopleApiSlice";
import useMatchMedia from "../../components/hooks/useMatchMedia";

import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import { openModalBlock, setOpenDetailedImage } from "../../redux/slices/navigationSlice";

import { Forum } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/joy";
import { setDialog } from "../../redux/slices/messageSlice";
import AttachmentsInDialogs from "../AllModals/AttachmentsInDialogs/AttachmentsInDialogs";
import DetailedImage from "../AllModals/AttachmentsInDialogs/components/DetailedImage/DetailedImage";
import ViewForwardedMessage from "../AllModals/ViewForwardedMessage/ViewForwardedMessage";
import ForwardMessageModal from "./Modal/ForwardMessageModal";
import BlockInputs from "./components/BlockInputs/BlockInputs";
import DragAndDropFileUpload from "./components/DragAndDropFileUpload/DragAndDropFileUpload";
import HeaderChat from "./components/HeaderChat/HeaderChat";
const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [searchParams, setSearchParams] = useSearchParams();
  const viewForwardMessage = useSelector((state) => state.navigation.modal.viewForwardMessage);

  const viewAttachmentsInDialogs = useSelector(
    (state) => state.navigation.modal.viewAttachmentsInDialogs,
  );

  const { isMobile } = useMatchMedia();
  const param = searchParams.get("dialogs");

  const { data: peopleCurrent = {}, isLoading } = useGetCurrentPersonQuery(
    searchParams.get("dialogs"),
    {
      skip: param && myId ? String(param) === String(myId) : true,
    },
  );

  useEffect(() => {
    if (param) dispatch(setDialog({ id: param }));
  }, [dispatch, param]);

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
    const onKeypress = (e) => {
      if (e.code === "Escape") {
        setSearchParams("");
      }
    };

    document?.addEventListener("keydown", onKeypress);

    return () => {
      document?.removeEventListener("keydown", onKeypress);
    };
  }, [dispatch, param, searchParams, setSearchParams]);

  if (!param && !isMobile) {
    return (
      <WrapperBlocks sx={{ height: "100%" }}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Forum sx={{ width: "3rem", height: "3rem" }} />
          <Typography>Выберите чат</Typography>
        </Stack>
      </WrapperBlocks>
    );
  }

  return (
    <WrapperBlocks
      sx={{
        p: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.vars.palette.background.body,
      }}
    >
      <HeaderChat myId={myId} isLoading={isLoading} peopleCurrent={peopleCurrent} />

      <DragAndDropFileUpload style={{ display: "contents" }}>
        <Communication />
        <BlockInputs />
      </DragAndDropFileUpload>

      {viewForwardMessage && <ViewForwardedMessage />}
      {viewAttachmentsInDialogs && <AttachmentsInDialogs />}
      <DetailedImage />
      <ForwardMessageModal />
    </WrapperBlocks>
  );
};

export default React.memo(Chat);
