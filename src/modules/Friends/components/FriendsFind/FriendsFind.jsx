import React, { useEffect, useState } from "react";
import s from "./FriendsFind.module.scss";
import AllPeopleItem from "./components/AllPeopleItem/AllPeopleItem";
import { useGetAllPeopleQuery } from "../../api/findPeopleApiSlice";
import { useAcceptFriendRequestsMutation } from "../../api/friendsApiSlice";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import WrapperBlocks from '../../../../components/ui/WrapperBlocks/WrapperBlocks'
import SearchBlock from '../../../../components/ui/SearchBlock/SearchBlock'
const FriendsFind = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();

  const { data: allPeople = [] } = useGetAllPeopleQuery();
  const [acceptFriendRequests, { isError }] = useAcceptFriendRequestsMutation();

  useEffect(() => {
    document.title = "Поиск друзей";
  }, []);

  const handlerPeople = async (index, obj) => {
    try {
      await acceptFriendRequests({
        second_user: obj.pk,
      }).unwrap();

      toast.success("Заявка отправлена", optionsNotification);
    } catch (err) {
      toast.error("Ошибка, заявка не отправлена, попробуйте позже", optionsNotification);
    }
  };

  return (
    <WrapperBlocks title={"Поиск друзей"}>
      <SearchBlock searchValue={searchValue} setSearch={setSearch} />
      <div className={s.list__allpeople}>
        {allPeople
          ?.filter((obj) => obj.first_name.toLowerCase().includes(searchValue.toLowerCase()) || obj.last_name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
            <AllPeopleItem key={obj.pk} obj={obj} index={index} handlerPeople={() => handlerPeople(index, obj)} />
          ))}
      </div>
    </WrapperBlocks>
  );
};

export default FriendsFind;