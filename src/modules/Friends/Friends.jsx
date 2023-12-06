import { Create } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Sheet,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  tabClasses,
} from "@mui/joy";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useHistoryPopState from "../../components/hooks/useHistoryPopState";
import { showFriendsPage } from "../../redux/slices/pages";
import { useGetFriendsQuery } from "./api/friendsApiSlice";
import { useGetPossibleFriendsQuery } from "./api/friendsPossibleFriendsApiSlice";
import { useGetFriendsRequestsQuery } from "./api/friendsRequestsApiSlice";
import FriendRequests from "./components/FriendRequests/FriendRequests";
import MyFriends from "./components/MyFriends/MyFriends";
import PossibleFriends from "./components/PossibleFriends/PossibleFriends";

const FindFriendsModal = lazy(() => import("./Modal/FindFriendsModal"));

const Friends = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const [findModal, setFindModal] = useState(false);
  const [visibleFindButton, setVisibleFindButton] = useState(false);
  const { data: allFriends = [], isFetching } = useGetFriendsQuery();
  const { data: friendRequests = [], isFetching: friendRequestsFetching } =
    useGetFriendsRequestsQuery();
  const { data: possibleFriends = [], isFetching: possibleFriendsFetching } =
    useGetPossibleFriendsQuery();

  useEffect(() => {
    document.title = "Друзья";
  }, []);

  useHistoryPopState(() => {
    dispatch(showFriendsPage(false));
  });

  const toggleVisibleFindButtonStart = () => {
    setVisibleFindButton(true);
  };
  const toggleVisibleFindButtonEnd = () => {
    setVisibleFindButton(false);
  };

  return (
    <Sheet
      component={motion.div}
      initial={{ left: -100, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
      exit={{ left: -100, opacity: 0 }}
      onHoverStart={toggleVisibleFindButtonStart}
      onHoverEnd={toggleVisibleFindButtonEnd}
      sx={{
        position: "absolute",
        top: "3.5rem",
        left: "0",
        bottom: "0",
        zIndex: 20,
        width: "100%",
      }}
    >
      <Tabs
        defaultValue={0}
        onChange={(event, value) => setSelected(value)}
        value={selected}
        sx={{
          bgcolor: "transparent",
          height: "100%",
          [`& .${tabClasses.selected}`]: {
            bgcolor: "transparent !important",
            borderRadius: "sm",
          },
          [`& .${tabClasses.root}:active`]: {
            bgcolor: "transparent !important",
            borderRadius: "sm",
          },
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            bgcolor: "transparent !important",
            borderRadius: "sm",
          },
        }}
      >
        <TabList
          sx={{
            py: 0.5,
            px: "0.75rem",
            gap: 0.5,
            bgcolor: "background.level1",
          }}
        >
          {["Друзья", "Заявки", "Возможные"].map((el, index) => (
            <>
              <Tab
                variant="plain"
                disableIndicator
                key={el}
                component={motion.div}
                sx={{
                  positions: "relative",
                  bgcolor: "transparent",
                  width: "100%",
                  px: "0.325rem",
                }}
              >
                <Box zIndex={2}>{el}</Box>
                <Skeleton loading={isFetching || friendRequestsFetching || possibleFriendsFetching}>
                  <Chip
                    size="sm"
                    variant={index === selected ? "soft" : "solid"}
                    color={index === selected ? "primary" : "neutral"}
                    sx={{ zIndex: 2 }}
                  >
                    {index === 0 && allFriends?.length}
                    {index === 1 && friendRequests?.length}
                    {index === 2 && possibleFriends?.length}
                  </Chip>
                </Skeleton>
                {index === selected && (
                  <Box
                    layoutId="selected"
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: "sm",
                      top: 0,
                      left: 0,
                      bgcolor: "background.surface",
                      "&::after": {
                        content: "''",
                        display: "block",
                        width: "70%",
                        margin: "auto",
                        height: "3px",
                        bgcolor: "neutral.plainColor",
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      },
                    }}
                    component={motion.div}
                    initial={{ backgroundColor: "background.surface" }}
                    animate={{ backgroundColor: "background.body" }}
                  />
                )}
              </Tab>
            </>
          ))}
        </TabList>
        <TabPanel sx={{ p: "0.75rem", height: "100%" }} value={0}>
          <MyFriends data={allFriends} isFetching={isFetching} setTab={setSelected} />
        </TabPanel>
        <TabPanel sx={{ p: "0.75rem", height: "100%" }} value={1}>
          <FriendRequests data={friendRequests} isFetching={friendRequestsFetching} />
        </TabPanel>
        <TabPanel sx={{ p: "0.75rem", height: "100%" }} value={2}>
          <PossibleFriends data={possibleFriends} isFetching={possibleFriendsFetching} />
        </TabPanel>
      </Tabs>
      <IconButton
        variant="solid"
        color="primary"
        circle
        size="xxl"
        onClick={() => setFindModal(true)}
        component={motion.button}
        initial={{ bottom: 0, opacity: 0 }}
        title="Написать новое сообщение"
        animate={
          visibleFindButton
            ? {
                bottom: "20px",
                opacity: 1,
              }
            : { bottom: 0, opacity: 0 }
        }
        transition={{ type: "spring", duration: 0.3 }}
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
        }}
      >
        <Create />
      </IconButton>
      <AnimatePresence>
        {findModal && (
          <Suspense>
            <FindFriendsModal isOpen={findModal} setIsOpen={setFindModal} />
          </Suspense>
        )}
      </AnimatePresence>
    </Sheet>
  );
};

export default Friends;
