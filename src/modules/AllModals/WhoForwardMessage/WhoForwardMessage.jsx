import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forwardMessageFlag } from "../../../redux/slices/navigationSlice";

import { useSearchParams } from "react-router-dom";
import useMatchMedia from "../../../components/hooks/useMatchMedia";
import { clearMessage, sendMessagesOnChat } from "../../../redux/slices/messageSlice";
import { setIndex } from "../../../redux/slices/peopleSlice";
import { useGetPeopleQuery } from "../../DialogsUsers/components/People/api/peopleApiSlice";
// import ModalDialog from "../../../components/ui/Modal/ModalDialog";
import { Bookmark, Close } from "@mui/icons-material";
import { CircularProgress, IconButton, Input, List, Modal, ModalDialog, Stack } from "@mui/joy";
import PeopleItem from "../../DialogsUsers/components/People/components/PeopleItem/PeopleItem";

const WhoForwardMessage = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearch] = useState("");
  const isVisible = useSelector((state) => state.navigation.forwardMessageFlag);

  const { data: people = [], isLoading } = useGetPeopleQuery();

  const myId = useSelector((state) => state.user.aboutUser.id);
  const [searchParams, setSearchParams] = useSearchParams();

  const forwardMessage = useSelector((state) => state.message.currentMessage[searchParams?.get("dialogs")]);
  const closeFunc = () => {
    dispatch(forwardMessageFlag(false));
  };
  const handlerPeople = (current__obj, index) => {
    dispatch(setIndex(index));
    setSearchParams({ dialogs: current__obj.pk });
    setSearch("");
    dispatch(
      sendMessagesOnChat({
        param: current__obj.pk,
        forwardMessage,
      }),
    );
    dispatch(clearMessage({ param: searchParams?.get("dialogs") }));
    dispatch(forwardMessageFlag(false));
  };

  return (
    <Modal
      open={isVisible}
      onClose={() => closeFunc()}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalDialog layout="center" size="md" variant="plain">
        <Stack direction="row" mb="1rem" gap="20px">
          <Input
            fullWidth
            size="md"
            value={searchValue}
            onChange={({ target: { value } }) => setSearch(value)}
            variant="plain"
            placeholder="Переслать "
            sx={{ outline: "none !important", border: "none !important" }}
          />
          <IconButton onClick={() => closeFunc()}>
            <Close />
          </IconButton>
        </Stack>
        <List sx={{gap: '0.5rem'}}>
          {isLoading && <CircularProgress size="sm" variant="plain" />}
          <PeopleItem
            key={"favorite"}
            handlerPeople={() => handlerPeople({ pk: myId }, 0)}
            obj={{
              id: myId,
              first_name: "Избранное",
              last_name: "",
            }}
            flag={"forward"}
          />
          {people
            ?.filter((obj) =>
              obj?.sender?.pk === myId && obj?.recip?.pk !== myId
                ? obj?.recip?.first_name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                  obj?.recip?.last_name.toLowerCase().includes(searchValue.toLowerCase())
                : obj?.sender?.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  obj?.sender?.last_name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            ?.map((obj, index) =>
              obj?.sender?.pk === myId && obj?.recip?.pk !== myId ? (
                <PeopleItem
                  key={obj.recip.pk}
                  message={`Вы: ${obj.message}`}
                  handlerPeople={() => handlerPeople(obj.recip, index)}
                  obj={obj.recip}
                  flag={"forward"}
                />
              ) : (
                <PeopleItem
                  key={obj.sender.pk}
                  message={obj.message}
                  handlerPeople={() => handlerPeople(obj.sender, index)}
                  obj={obj.sender}
                  flag={"forward"}
                />
              ),
            )}
        </List>
      </ModalDialog>
    </Modal>
  );
};

export default WhoForwardMessage;
