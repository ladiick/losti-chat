import { Box, CircularProgress, List, Typography } from "@mui/joy";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPeopleQuery } from "../../api/peopleApiSlice.js";
import useMatchMedia from "../../components/hooks/useMatchMedia.jsx";
import CustomScroll from "../../components/ui/CustomScroll/CustomScroll.jsx";
import { openChatBlock } from "../../redux/slices/navigationSlice.js";
import { setIndex } from "../../redux/slices/peopleSlice.js";
import PeopleItem from "./components/PeopleItem.jsx";
import { LeftColumnContext } from "../LeftColumn/LeftColumn.jsx";

const DialogsUsers = () => {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const people = useSelector((state) => state.people.people);
  const { searchValue, setSearchValue } = useContext(LeftColumnContext);

  const { isLoading, isError } = useGetPeopleQuery();

  const { isMobile } = useMatchMedia();

  const handlerPeople = (index) => {
    dispatch(setIndex(index));
    if (isMobile) {
      dispatch(openChatBlock(true));
    }
    dispatch(setSearchValue(""));
  };

  if (isLoading || isError) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%,-50%)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <CircularProgress variant="plain" color={isError ? "danger" : "primary"} />
        {isError && <Typography color="danger">Ошибка, не удалось загрузить диалоги</Typography>}
      </Box>
    );
  }
  return (
    <Box sx={{ p: "0 0 0 0.75rem", height: "calc(100dvh - 3.5rem)" }}>
      <List
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          transition: "all .3s",
          pr: "0.75rem",
          gap: "0.3rem",
          ...CustomScroll,
        }}
      >
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
                message={{
                  message: obj.message,
                  answer: obj.answer,
                  forward: obj.forward,
                  images: obj.images,
                }}
                time={obj.time}
                handlerPeople={() => handlerPeople(index)}
                obj={obj?.recip}
              />
            ) : (
              <PeopleItem
                key={obj.sender.pk}
                message={{
                  message: obj.message,
                  answer: obj.answer,
                  forward: obj.forward,
                  images: obj.images,
                }}
                time={obj.time}
                handlerPeople={() => handlerPeople(index)}
                obj={obj?.sender}
              />
            ),
          )}
      </List>
    </Box>
  );
};

export default DialogsUsers;
