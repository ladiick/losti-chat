import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
import { useGetPeopleQuery } from "../../../api/peopleApiSlice";
import { clearSelectMessages, selectedMessages } from "../../../redux/slices/messageSlice";
import { setIndex } from "../../../redux/slices/peopleSlice";

import { Close } from "@mui/icons-material";
import { CircularProgress, IconButton, Input, List, Stack } from "@mui/joy";
import { MyContext } from "../../../Pages/Layout/Layout";
import useHistoryPopState from "../../../components/hooks/useHistoryPopState";
import Modal from "../../../components/ui/Modal";
import { modalsSelectors, setForwardModal } from "../../../redux/slices/modalsSlice";
import PeopleItem from "../../DialogsUsers/components/PeopleItem";

const ForwardMessageModal = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearch] = useState("");
  const { socket } = useContext(MyContext);

  const myId = useSelector((state) => state.user.aboutUser.id);
  const { isOpenForwardModal } = useSelector((state) => modalsSelectors(state));

  const [, setSearchParams] = useSearchParams();

  const forwardMessage = useSelector((state) => selectedMessages(state));

  const { data: people = [], isLoading } = useGetPeopleQuery();

  const closeFunc = () => {
    dispatch(setForwardModal(false));
  };

  useHistoryPopState(closeFunc);

  const handlerPeople = (currentObj, index) => {
    dispatch(setIndex(index));
    setSearchParams({ dialogs: currentObj.pk });
    socket?.send(
      JSON.stringify({
        request_id: new Date().getTime(),
        message: "",
        action: "create_dialog_message",
        forward: forwardMessage.length ? forwardMessage?.map((a) => a.id) : [],
        answer: {},
        recipient: currentObj.pk,
      }),
    );
    // dispatch(
    //   sendMessagesOnChat({
    //     param: currentObj.pk,
    //     forwardMessage,
    //   }),
    // );
    dispatch(clearSelectMessages());
    dispatch(setForwardModal(false));
  };

  const searchFilter = useCallback(
    (obj) =>
      obj?.sender?.pk === myId && obj?.recip?.pk !== myId
        ? obj?.recip?.first_name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj?.recip?.last_name.toLowerCase().includes(searchValue.toLowerCase())
        : obj?.sender?.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          obj?.sender?.last_name.toLowerCase().includes(searchValue.toLowerCase()),
    [myId, searchValue],
  );

  return (
    <Modal open={isOpenForwardModal} onClose={() => closeFunc()}>
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
      <List sx={{ gap: "0.5rem" }}>
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
          ?.filter((obj) => searchFilter(obj))
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
    </Modal>
  );
};

export default ForwardMessageModal;
