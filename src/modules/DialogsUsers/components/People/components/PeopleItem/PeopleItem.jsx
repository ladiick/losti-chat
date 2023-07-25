import { reTime } from "../../../../../../components/actions/reTime.js";
import s from "./PeopleItem.module.scss";

import React from "react";
import { useSearchParams } from "react-router-dom";
import Avatar from "../../../../../../components/ui/Avatar/Avatar";
import Text from "../../../../../../components/ui/Text/Text";

const PeopleItem = ({ flag, message, time, handlerPeople, obj, index }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const classPeopleItem = searchParams.get("dialogs") == obj?.pk ? s.block__people__item__active : s.block__people__item;

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
      <div onClick={handlerPeople} className={classPeopleItem}>
        <div className={s.info__message}>
          <Avatar
            noOnline={obj.online}
            style={{ width: 45, height: 45 }}
            index={index}
            image={obj.image}
            name={{ firstName: obj.first_name, lastName: obj.last_name }}
          />

          <div className={s.name__lastMessage}>
            <Text weight="strong" pointer>
              {obj.first_name} {obj.last_name}
            </Text>
            <Text className={s.last__message} pointer>
              {message}
            </Text>
          </div>
          <div className={s.wrapper__time}>
            <p className={s.time}>{reTime(time)}</p>
            {/*<span className={s.quantity__message}>2</span>*/}
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PeopleItem);
