import { Button } from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDialog from "../../../components/ui/Modal/ModalDialog";
import Text from "../../../components/ui/Text/Text";
import { deleteFriend } from "../../../redux/slices/navigationSlice";
import { useDeleteFriendsMutation } from "../api/friendsApiSlice";

const DeleteFriendModal = () => {
  const dispatch = useDispatch();

  const deleteFriendFlag = useSelector((state) => state.navigation.deleteFriend);
  const deleteFriendObj = useSelector((state) => state.navigation.deleteFriendObj);
  const [deleteFriends] = useDeleteFriendsMutation();
  const deleteFriendFunc = async () => {
    await deleteFriends(deleteFriendObj.pk);
  };

  return (
    <ModalDialog
      noFooter
      closeFunc={() => dispatch(deleteFriend({ flag: false, obj: {} }))}
      open={deleteFriendFlag}
      title={"Подтвердите удаление"}
    >
      <Text>
        Вы точно хотите удалить{" "}
        <Text style={{ textDecoration: "underline" }} weight={"strong"}>
          {deleteFriendObj?.first_name + " " + deleteFriendObj?.last_name}
        </Text>{" "}
        из друзей?
      </Text>
      <div>
        <Button
          // style={{
          //   background: "#EA2B3EFF",
          //   color: "var(--color--text--main)",
          //   marginRight: 15,
          // }}
          onClick={deleteFriendFunc}
        >
          Удалить
        </Button>
        <Button onClick={() => dispatch(deleteFriend({ flag: false, obj: {} }))}>Закрыть</Button>
      </div>
    </ModalDialog>

    // <AnimatePresence>
    // 	{deleteFriendFlag && (
    // 		<Dialog
    // 			open={deleteFriendFlag}
    // 			onClose={() => {
    // 			}}>
    // 			<motion.div
    // 				className={s.animation}
    // 				initial={{y: -100}}
    // 				animate={{y: 0}}
    // 				exit={{y: -100}}>
    // 				<WrapperBlocks className={s.wrapper__content}>
    // 					<Title>
    // 						Удалить из друзей
    // 						<Text>{deleteFriendObj?.first_name + ' ' + deleteFriendObj?.last_name}?</Text>
    // 					</Title>
    // 					<div className={s.content}>
    // 						<button onClick={deleteFriendFunc}>Да</button>
    // 						<button onClick={() => dispatch(deleteFriend({flag: false, obj: {}}))}>Нет</button>
    // 					</div>
    // 				</WrapperBlocks>
    // 			</motion.div>
    // 		</Dialog>)}
    // </AnimatePresence>
  );
};

export default DeleteFriendModal;
