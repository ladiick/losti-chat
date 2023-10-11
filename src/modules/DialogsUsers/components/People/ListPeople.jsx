import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import Loader from "../../../../components/ui/Loader/Loader";
import LoaderWrapper from "../../../../components/ui/LoaderWrapper/LoaderWrapper";
import { openChatBlock, setSearchValue } from "../../../../redux/slices/navigationSlice";
import { setIndex } from "../../../../redux/slices/peopleSlice";
import s from "./ListPeople.module.scss";
import { useGetPeopleQuery } from "./api/peopleApiSlice.js";
import PeopleItem from "./components/PeopleItem/PeopleItem";
import { List, Typography } from '@mui/joy'

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

const People = () => {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const people = useSelector((state) => state.people.people);
  const {searchValue} = useSelector(state=>state.navigation)
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
    dispatch(setSearchValue(""));
  };

  return (
    <div className={s.block__people}>

      {isLoading || isError ? <LoaderWrapper>
        <Loader visible={isLoading || isError} />
      </LoaderWrapper>
      : null
      }

      {isError && <Typography color='danger'>Ошибка, не удалось загрузить диалоги</Typography>}
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
              />
            ) : (
              <PeopleItem
                key={obj.sender.pk}
                message={obj.message}
                time={obj.time}
                handlerPeople={() => handlerPeople(obj.sender, index)}
                obj={obj?.sender}
              />
            ),
          )}
      </List>
    </div>
  );
};

export default People;