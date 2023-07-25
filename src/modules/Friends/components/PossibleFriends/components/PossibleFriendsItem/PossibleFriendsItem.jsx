import React from "react";
import s from "./PossibleFriendsItem.module.scss";
import BtnAddFriend from "../../../BtnAddFriend/BtnAddFriend";
import Avatar from "../../../../../../components/ui/Avatar/Avatar";
import { Link } from "react-router-dom";
import { changeDeclination } from "../../../../../../components/actions/changeDeclination";
import Text from "../../../../../../components/ui/Text/Text";

const PossibleFriendsItem = ({ obj, handlerPeople, index }) => {
  return (
    <div className={s.wrapper__people}>
      <Link to={`/profile/${obj.possible_friend.pk}`} className={s.about__user}>
        <Avatar
          noOnline={obj?.possible_friend?.online}
          sizeIndicator={{ width: 12, height: 12 }}
          style={{ width: 48, height: 48, fontSize: 20 }}
          image={obj?.possible_friend?.image}
          name={{ firstName: obj.possible_friend?.first_name, lastName: obj.possible_friend?.last_name }}
          index={index}
        />

        <div className={s.user__info}>
          <Text pointer>
            {obj.possible_friend.first_name} {obj.possible_friend.last_name}
          </Text>
          <span className={s.NumFriend}>{changeDeclination(obj.count, "posFriend")}</span>
        </div>
      </Link>
      <BtnAddFriend handlerPeople={handlerPeople} />
    </div>
  );
};

export default PossibleFriendsItem;
