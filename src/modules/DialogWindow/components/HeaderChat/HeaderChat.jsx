import { ArrowBack } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Link as LinkMui, Skeleton, useTheme } from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HOST } from "../../../../components/api/HOST";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import PanelHeader from "../../../../components/ui/WrapperBlocks/components/PanelHeader";
import { openChatBlock } from "../../../../redux/slices/navigationSlice";
import HeaderForwardMessage from "../HeaderForwardMessage/HeaderForwardMessage";
import RightSideBlock from "./RightSideBlock/RightSideBlock";
const HeaderChat = ({ isLoading, myId, peopleCurrent }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const chatActive = useSelector((state) => state.navigation.chat);
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const { isMobile } = useMatchMedia();
  const [searchParams] = useSearchParams();

  if (currentMessage?.[searchParams.get("dialogs")]?.length && !isMobile) {
    return <HeaderForwardMessage />;
  }

  return (
    <>
      <PanelHeader
        sx={{
          height: "3.5rem",
          py: "0.75rem",
          px: isMobile ? 0 : "1rem",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: theme.vars.palette.background.surface,
        }}
        before={
          isMobile && (
            <IconButton
              onClick={() => {
                navigation(-1);
                dispatch(openChatBlock(false));
              }}
            >
              <ArrowBack />
            </IconButton>
          )
        }
        after={<RightSideBlock />}
      >
        <Badge color="success" badgeInset="14%" invisible={!peopleCurrent.online} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Avatar
            component={Link}
            to={`/profile/${searchParams.get("dialogs")}`}
            alt={peopleCurrent.first_name + peopleCurrent.last_name}
            src={isLoading ? "" : `${HOST + peopleCurrent.image}`}
            sx={{ mr: "0.75rem" }}
          >
            {isLoading ? <Skeleton loading={isLoading} /> : peopleCurrent?.first_name?.[0]}
          </Avatar>
        </Badge>

        <LinkMui color="neutral" underline="none" level="title-lg" component={Link} to={`/profile/${searchParams.get("dialogs")}`}>
          <Skeleton loading={isLoading}>
            {searchParams.get("dialogs") === String(myId) ? "Избранное" : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`}
          </Skeleton>
        </LinkMui>
      </PanelHeader>
    </>
  );
};

export default React.memo(HeaderChat);
