import { reTime } from "../../../../../../components/actions/reTime.js";
import s from "./PeopleItem.module.scss";

import React from "react";
import { useSearchParams } from "react-router-dom";
import Avatar from "../../../../../../components/ui/Avatar/Avatar";
import Text from "../../../../../../components/ui/Text/Text";
import Typography from "../../../../../../components/ui/Typography/Typography.jsx";

const PeopleItem = ({ flag, message, time, handlerPeople, obj, index }) => {
  const [searchParams] = useSearchParams();

  const activeItem = searchParams.get("dialogs") === String(obj?.pk);

  if (flag === "forward") {
    return (
      <div className={s.main__wrapper} title={obj.first_name + " " + obj.last_name}>
        <div onClick={handlerPeople} className={s.block__people__item}>
          <div className={s.info__message}>
            <Avatar
              style={{ width: 45, height: 45, marginRight: 10 }}
              noOnline={obj.online}
              index={index}
              image={obj.image}
              name={{ firstName: obj.first_name, lastName: obj.last_name }}
            />

            <div className={s.name__lastMessage}>
              <Text weight="strong" pointer>
                {obj.first_name} {obj.last_name}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.main__wrapper} title={obj.first_name + " " + obj.last_name}>
      <div onClick={handlerPeople} className={`${s.item} ${activeItem ? s.item__active : ""}`}>
        <div className={s.info__message}>
          <Avatar online={obj.online} size={54} image={obj.image} />

          <div className={s.name__lastMessage}>
            <Typography as={"h3"} level={"bodyM"} weight="bold">
              {obj.first_name} {obj.last_name}
            </Typography>
            <Typography as={"p"} level={"bodyM"} color={"neutral"}>
              {message}
            </Typography>
          </div>
          <div className={s.wrapper__time}>
            <span className={s.time}>{reTime(time)}</span>
            <span className={s.quantity__message}>2</span>
            {/* <span>1</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PeopleItem);
