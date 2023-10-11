import { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "underscore";
import { setMessage } from "../../../../../redux/slices/messageSlice";
import { MyContext } from "../../../../Layout/Layout";
import { addTimeMessage } from "../../../helpers/addTimeMessage";
import BlockMessages from "./BlockMessages";

const ListMessages = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const message = useSelector((state) => state.message.message);
  const people = useSelector((state) => state.people.people);
  const myId = useSelector((state) => state.user.aboutUser.id);

  const { newMessage } = useContext(MyContext);

  const outputMessages = useMemo(() => {
    return addTimeMessage(message?.results);
  }, [message?.results]);

  useEffect(() => {
    if (newMessage && message?.results?.[0]?.id !== newMessage.id) {
      const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort((a, b) => a - b);
      const chat = [myId, Number(searchParams.get("dialogs"))].sort((a, b) => a - b);

      let ind = people.findIndex((obj) => {
        return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
      });

      if (ind !== -1) {
        const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort();
        const isEqual = _.isEqual(arr1, arr2);
        if (isEqual) {
          dispatch(setMessage(newMessage));
        }
      }
    }
  }, [dispatch, message?.results, myId, newMessage, people, searchParams]);

  return (
    <>
      {outputMessages.map((obj, index) => (
        <BlockMessages key={index} block={obj} />
      ))}
    </>
  );
};

export default ListMessages;
