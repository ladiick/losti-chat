import React from "react";
import { toast } from "react-toastify";
import { useAcceptFriendRequestsMutation } from "../../api/friendsApiSlice";
import { useGetPossibleFriendsQuery } from "../../api/friendsPossibleFriendsApiSlice";
import PossibleFriendsItem from "./components/PossibleFriendsItem/PossibleFriendsItem";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import s from "./PossibleFriends.module.scss";
import Title from '../../../../components/ui/Title/Title'
const PossibleFriends = () => {
  const { data: possibleFriends = [] } = useGetPossibleFriendsQuery();
  const [acceptFriendRequests, { isError }] = useAcceptFriendRequestsMutation();

  const handlerPeople = async (index, obj) => {
    try {
      await acceptFriendRequests({
        second_user: obj.possible_friend.pk,
      }).unwrap();

      toast.success("Заявка отправлена", optionsNotification);
    } catch (err) {
      console.log(err);
      toast.error("Ошибка, заявка не отправлена, попробуйте позже", optionsNotification);
    }
  };
  if (possibleFriends.length === 0) {
    return;
  }

  return (
    <WrapperBlocks title={"Возможные друзья"}>
      <div className={s.block__scroll}>
        {possibleFriends?.map((obj, index) => (
          <PossibleFriendsItem key={obj.possible_friend.pk} obj={obj} index={index} handlerPeople={() => handlerPeople(index, obj)} />
        ))}
      </div>
    </WrapperBlocks>
  );
};

export default PossibleFriends;
