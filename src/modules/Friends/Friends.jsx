import { Sheet, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { keyframes } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHistoryPopState from "../../components/hooks/useHistoryPopState";
import { pageSelector, showFriendsPage } from "../../redux/slices/pages";

const inAnimation = keyframes`
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(0) ;
  }
`;
const outAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200px);
  }
`;

const Friends = () => {
  const { friends } = useSelector((state) => pageSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Друзья";
  }, []);

  useHistoryPopState(() => {
    dispatch(showFriendsPage(false));
    setTimeout(() => dispatch(showFriendsPage(null)), 300);
  });

  return (
    <Sheet
      sx={{
        position: "absolute",
        top: "3.5rem",
        left: "0",
        bottom: "0",
        zIndex: 20,
        width: "100%",
        ...(friends === true && {
          animation: `${inAnimation} 300ms forwards`,
        }),
        ...(friends === false && {
          animation: `${outAnimation} 300ms forwards`,
        }),
      }}
    >
      <Tabs>
        <TabList
          disableUnderline
          sx={{ borderBottom: "1px solid", justifyContent: "space-around" }}
        >
          <Tab variant="plain" indicatorInset>
            Друзья
          </Tab>
          <Tab variant="plain" indicatorInset>
            Заявки
          </Tab>
          <Tab variant="plain" indicatorInset>
            Возможные
          </Tab>
        </TabList>
        <TabPanel>my Friends</TabPanel>
      </Tabs>
    </Sheet>
  );
};

export default Friends;
