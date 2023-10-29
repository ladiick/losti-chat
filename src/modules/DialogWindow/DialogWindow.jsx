import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Communication from "./components/Communication/Communication";

import { useGetCurrentPersonQuery } from "../../components/features/currentPeopleApiSlice";
import useMatchMedia from "../../components/hooks/useMatchMedia";

import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";

import { Forum } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/joy";
import { imagesDetailed, setDialog } from "../../redux/slices/messageSlice";
import AttachmentsInDialogs from "../AllModals/AttachmentsInDialogs/AttachmentsInDialogs";

import ViewForwardedMessage from "../AllModals/ViewForwardedMessage/ViewForwardedMessage";
import BlockInputs from "./components/BlockInputs/BlockInputs";
import DragAndDropFileUpload from "./components/DragAndDropFileUpload/DragAndDropFileUpload";
import HeaderChat from "./components/HeaderChat/HeaderChat";

const ForwardMessageModal = lazy(() => import("./Modal/ForwardMessageModal"));

const DetailedImage = lazy(() => import("./Modal/DetailedImage"));

const Chat = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const { isOpen: isOpenDetailedImage } = useSelector((state) => imagesDetailed(state));
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

      {isOpenDetailedImage && (
        <Suspense>
          <DetailedImage />
        </Suspense>
      )}
      <Suspense>
        <ForwardMessageModal />
      </Suspense>
    </WrapperBlocks>
  );
};

export default React.memo(Chat);
