import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "underscore";
import { MyContext } from "../../../../../Pages/Layout/Layout";
import { addNewMessage } from "../../../helpers/helpersMessage";
import BlockMessages from "./BlockMessages";

function findPeopleIndex(people, chat) {
  return people.findIndex((obj) => {
    return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
  });
}

const ListMessages = ({ messages, setMessages, data }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");
  const people = useSelector((state) => state.people.people);
  const myId = useSelector((state) => state.user.aboutUser.id);
  const { newMessage } = useContext(MyContext);

  useEffect(() => {
    if (newMessage) {
      const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort((a, b) => a - b);
      const chat = [myId, Number(param)].sort((a, b) => a - b);
      const ind = findPeopleIndex(people, chat);

      if (ind !== -1) {
        const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort();
        const isEqual = _.isEqual(arr1, arr2);
        if (isEqual) {
          setMessages((pre) => addNewMessage(pre, newMessage));
        }
      }
    }
  }, [dispatch, myId, newMessage, people, setMessages, param]);

  return (
    <>
      {messages?.map((obj, index) => (
        <BlockMessages key={index} block={obj} />
      ))}
    </>
  );
};

export default ListMessages;
