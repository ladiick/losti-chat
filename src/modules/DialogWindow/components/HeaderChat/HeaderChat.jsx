import React from "react";
import SceletonHeader from "./SceletonHeader";
import favorite from "../../../DialogsUsers/components/People/assets/favorite.svg";
import s from "./HeaderChat.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import HeaderForwardMessage from "../HeaderForwardMessage/HeaderForwardMessage";
import RightSideBlock from "./RightSideBlock/RightSideBlock";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import { openChatBlock } from "../../../../redux/slices/navigationSlice";
import ActionLink from "../../../../components/ui/ActionLink/ActionLink";
import EmptyImage from "../../../../components/ui/EmptyImage/EmptyImage";
import Text from "../../../../components/ui/Text/Text";
const HeaderChat = ({ isLoading, myId, peopleCurrent }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const chatActive = useSelector((state) => state.navigation.chat);
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const { isMobile } = useMatchMedia();
  const [searchParams, setSearchParams] = useSearchParams();
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
            <div
              className={s.arrow__back}
              onClick={() => {
                navigation("/");
                dispatch(openChatBlock(false));
              }}
            >
              <FiArrowLeft />
            </div>
          )}
          <ActionLink to={`/profile/${searchParams.get("dialogs")}`}>
            {searchParams.get("dialogs") == myId ? (
              <img src={favorite} alt="logo" />
            ) : (
              <EmptyImage
                noOnline={peopleCurrent?.online}
                style={{ width: 30, height: 30, fontSize: 13 }}
                name={{ firstName: peopleCurrent?.first_name, lastName: peopleCurrent?.last_name }}
                image={peopleCurrent.image}
              />
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
