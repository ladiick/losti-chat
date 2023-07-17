import React from "react";
import s from "./MessageDate.module.scss";
import Text from "../../../../../components/ui/Text/Text";
import { reTime } from "../../../../../components/actions/reTime";
const MessageDate = React.memo(({ wrapper, message }) => {
  return (
    <div className={`${wrapper} ${s.message__enter_date}`}>
      <Text className={s.date__block} weight={"strong"}>
        {reTime(message)}
      </Text>
    </div>
  );
});

export default MessageDate;
