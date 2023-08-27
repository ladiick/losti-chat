import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import Loader from "../../../../components/ui/Loader/Loader";
import LoaderWrapper from "../../../../components/ui/LoaderWrapper/LoaderWrapper";
import { openChatBlock } from "../../../../redux/slices/navigationSlice";
import { setIndex } from "../../../../redux/slices/peopleSlice";
import s from "./ListPeople.module.scss";
import { useGetPeopleQuery } from "./api/peopleApiSlice.js";
import PeopleItem from "./components/PeopleItem/PeopleItem";
import { List } from '@mui/joy'

const errorStyles = {
  width: "100%",
  fontSize: "12px",
  textAlign: "center",
  color: "red",
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const People = ({ searchValue, setSearch }) => {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [, setSearchParams] = useSearchParams();
  const people = useSelector((state) => state.people.people);

  //*request
  const { isLoading, isError } = useGetPeopleQuery();
  //*request

  const { isMobile } = useMatchMedia();

  const handlerPeople = (current__obj, index) => {
    dispatch(setIndex(index));
    if (isMobile) {
      dispatch(openChatBlock(true));
    }
    // setSearchParams({ dialogs: current__obj.pk });
    setSearch("");
  };

  return (
    <div className={s.block__people}>

      {isLoading || isError ? <LoaderWrapper>
        <Loader visible={isLoading || isError} />
      </LoaderWrapper>
      : null
      }

      {isError && <span style={errorStyles}>Ошибка, не удалось загрузить диалоги</span>}
      <List className={s.wrapper__items}>
        {people
          ?.filter((people) =>
            people.sender.pk === myId && people.recip.pk !== myId
              ? people?.recip.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                people?.recip.last_name.toLowerCase().includes(searchValue.toLowerCase())
              : people?.sender.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                people?.sender.last_name.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map((obj, index) =>
            obj.sender.pk === myId && obj.recip.pk !== myId ? (
              <PeopleItem
                key={obj.recip.pk}
                message={obj.message && `Вы: ${obj.message}`}
                time={obj.time}
                handlerPeople={() => handlerPeople(obj.recip, index)}
                obj={obj?.recip}
                obj2={obj}
                index={index}
              />
            ) : (
              <PeopleItem
                key={obj.sender.pk}
                message={obj.message}
                time={obj.time}
                handlerPeople={() => handlerPeople(obj.sender, index)}
                obj={obj?.sender}
                index={index}
              />
            ),
          )}
      </List>
    </div>
  );
};

export default People;

// : obj.sender.pk === myId && obj.recip.pk === myId ? (
//               <PeopleItem
//                 key={0}
//                 id={obj.sender.pk}
//                 firstName={"Избранное"}
//                 lastName={""}
//                 message={obj.message}
//                 time={obj.time}
//                 img={favorite}
//                 handlerPeople={() => handlerPeople(obj.sender, index)}
//                 obj={obj.sender}
//                 index={index}
//               />
//             )
