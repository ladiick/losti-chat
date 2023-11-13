import React, { useContext, useEffect, useRef, useState } from "react";
import s from "./WriteFriend.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModalBlock } from "../../../redux/slices/navigationSlice.js";
import { setFriendsCurrent } from "../../Friends/slices/friendsSlice.js";
import { toast } from "react-toastify";
import Text from "../../../components/ui/Text/Text";
import { MyContext } from "../../../Pages/Layout/Layout";
import { optionsNotification } from "../../../components/actions/optionsNotification";
import ModalDialog from "../../../components/ui/Modal/ModalDialog";
import Avatar from "../../../components/ui/Avatar/Avatar";
import { ActionButton } from "../../../components/ui/Button/ActionButton/ActionButton";

const WriteFriend = () => {
  const dispatch = useDispatch();
  const friendsCurrent = useSelector((state) => state.friends.friendsCurrent);
  const modalActive = useSelector((state) => state.navigation.modal.writeFriend);
  const refTextArea = useRef(null);
  const { socket } = useContext(MyContext);
  const [textArea, setTextArea] = useState("");

  useEffect(() => {
    if (modalActive) {
      refTextArea?.current?.focus();
    }
  }, [modalActive]);

  const closeFunc = () => {
    dispatch(setFriendsCurrent({}));
    dispatch(openModalBlock({ writeFriend: false }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (textArea === "") return;

    socket?.send(
      JSON.stringify({
        request_id: new Date().getTime(),
        message: textArea,
        action: "create_dialog_message",
        recipient: friendsCurrent.friend.pk,
      }),
    );
    toast.success("Сообщение отправлено", optionsNotification);
    setTextArea("");
    dispatch(openModalBlock(false));
    dispatch(setFriendsCurrent({}));
  };

  return (
    <ModalDialog noFooter open={modalActive} closeFunc={closeFunc} title="Написать сообщение">
      <div className={s.wrapper__info__user}>
        <Avatar
          image={friendsCurrent?.friend?.image}
          name={{
            firstName: friendsCurrent?.friend?.first_name,
            lastName: friendsCurrent?.friend?.last_name,
          }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />

        <div className={s.info__user}>
          <Text pointer weight="strong">
            {friendsCurrent?.friend?.first_name} {friendsCurrent?.friend?.last_name}
          </Text>
        </div>
      </div>
      <form className={s.form}>
        <textarea
          value={textArea}
          maxLength="4000"
          onChange={(e) => setTextArea(e.target.value)}
          cols="40"
          rows="8"
          ref={refTextArea}
        />
        <ActionButton onClick={onSubmit} style={{ marginTop: 20, alignSelf: "flex-end" }}>
          Отправить
        </ActionButton>
      </form>
    </ModalDialog>
  );
};

export default WriteFriend;
