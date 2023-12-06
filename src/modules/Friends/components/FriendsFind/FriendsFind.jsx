import { Search } from "@mui/icons-material";
import { Box, CircularProgress, Input, List, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { useGetAllPeopleQuery } from "../../api/findPeopleApiSlice";
import { useAcceptFriendRequestsMutation } from "../../api/friendsApiSlice";
import AllPeopleItem from "./components/AllPeopleItem/AllPeopleItem";

const FriendsFind = () => {
  const [searchValue, setSearch] = useState("");

  const { data: allPeople = [], isFetching } = useGetAllPeopleQuery();
  const [acceptFriendRequests] = useAcceptFriendRequestsMutation();

  useEffect(() => {
    document.title = "Поиск друзей";
  }, []);

  const handlerPeople = async (obj) => {
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
    <>
      <Typography sx={{ mb: "0.25rem" }}>Новое сообщение</Typography>
      <Input
        value={searchValue}
        onChange={(e) => setSearch(e.target.value)}
        endDecorator={<Search />}
      />

      {isFetching ? (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress variant="plain" size="sm" sx={{ margin: "auto" }} />
        </Box>
      ) : (
        <List
          sx={{
            overflowY: "auto",
            gap: "4px",
            pr: "0.5rem",
            maxHeight: "calc(100% - 36px)",
            ...CustomScroll,
          }}
        >
          {allPeople
            ?.filter(
              (obj) =>
                obj.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                obj.last_name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((obj, index) => (
              <AllPeopleItem
                key={obj.pk}
                obj={obj}
                index={index}
                handlerPeople={() => handlerPeople(obj)}
              />
            ))}
        </List>
      )}
    </>
  );
};

export default FriendsFind;
