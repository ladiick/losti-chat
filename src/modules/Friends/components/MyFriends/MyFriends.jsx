import { AddCircle } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, List, Typography } from "@mui/joy";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { LeftColumnContext } from "../../../LeftColumn/LeftColumn";
import DeleteFriendModal from "../../Modal/DeleteFriendModal";
import FriendsItem from "../FriendsItem/FriendsItem";

function MyFriends({ data, setTab, isFetching }) {
  const deleteFriend = useSelector((state) => state.navigation.deleteFriend);
  const { searchValue } = useContext(LeftColumnContext);

  if (data?.length === 0) {
    return (
      <>
        <Typography textAlign="center">У вас нет друзей!</Typography>
        <Typography
          justifyContent="center"
          endDecorator={
            <IconButton onClick={() => setTab(2)}>
              <AddCircle />
            </IconButton>
          }
        >
          Cкорее добавьте их
        </Typography>
      </>
    );
  }

  return (
    <>
      {deleteFriend && <DeleteFriendModal />}
      {isFetching ? (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress variant="plain" size="sm" sx={{ margin: "auto" }} />
        </Box>
      ) : (
        <List sx={{ overflowY: "auto", ...CustomScroll }}>
          {searchValue
            ? data
                ?.filter(
                  (obj) =>
                    obj.friend.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    obj.friend.last_name.toLowerCase().includes(searchValue.toLowerCase()),
                )
                ?.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)
            : data?.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)}
        </List>
      )}
    </>
  );
}

export default MyFriends;
