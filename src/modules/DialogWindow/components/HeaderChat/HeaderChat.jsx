import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import ActionLink from "../../../../components/ui/ActionLink/ActionLink";
import ArrowBack from "../../../../components/ui/ArrowBack/ArrowBack";
import Avatar from "../../../../components/ui/Avatar/Avatar";
import Text from "../../../../components/ui/Text/Text";
import { openChatBlock } from "../../../../redux/slices/navigationSlice";
import favorite from "../../../DialogsUsers/components/People/assets/favorite.svg";
import HeaderForwardMessage from "../HeaderForwardMessage/HeaderForwardMessage";
import s from "./HeaderChat.module.scss";
import RightSideBlock from "./RightSideBlock/RightSideBlock";
import SceletonHeader from "./SceletonHeader";
const HeaderChat = ({ isLoading, myId, peopleCurrent }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const chatActive = useSelector((state) => state.navigation.chat);
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const { isMobile } = useMatchMedia();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return (
      <header className={s.header}>
        <SceletonHeader />
      </header>
    );
  }

  if (currentMessage?.[searchParams.get("dialogs")]?.length && !isMobile) {
    return <HeaderForwardMessage />;
  }

  return (
    <>
      <header className={s.header}>
        <div className={s.left__side}>
          {chatActive && isMobile && (
            <ArrowBack
              onClick={() => {
                navigation("/");
                dispatch(openChatBlock(false));
              }}
            />
          )}
          <ActionLink to={`/profile/${searchParams.get("dialogs")}`}>
            {searchParams.get("dialogs") == myId ? (
              <img src={favorite} alt="logo" />
            ) : (
              <Avatar online={peopleCurrent?.online} size={30} image={peopleCurrent.image} />
            )}
          </ActionLink>

          <div className={s.person__info}>
            <ActionLink to={`/profile/${searchParams.get("dialogs")}`} noHover defaultColor size={14} weight={500}>
              {searchParams.get("dialogs") == myId ? "Избранное" : `${peopleCurrent.first_name} ${peopleCurrent.last_name}`}
            </ActionLink>
            <Text style={{ marginLeft: 8, color: "var(--text--secondary)" }}>{peopleCurrent?.online ? "онлайн" : "был в сети ..."}</Text>
          </div>
        </div>

        <RightSideBlock />
      </header>
    </>
  );
};

export default React.memo(HeaderChat);
