import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectMessages } from "../../../../../redux/slices/messageSlice";
import { helperMessage } from "../../../../../utils/utils";
import Message from "../../Message/Message";

const BlockMessages = ({ block }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");

  const handlerCurrentMessage = useCallback(
    (obj) => {
      dispatch(selectMessages({ obj }));
    },
    [dispatch, param],
  );
  return (
    <div>
      <Message
        key={`${block?.date}_time`}
        obj={{
          type: "Date",
          message: block?.date,
        }}
      />
      {block?.messages
        .map((obj, index, arr) =>
          helperMessage(arr?.[index], arr?.[index - 1]) ? (
            <Message
              key={obj.id}
              obj={obj}
              margin={true}
              handlerCurrentMessage={() => handlerCurrentMessage(obj)}
            />
          ) : (
            <Message
              key={obj.id}
              obj={obj}
              margin={false}
              handlerCurrentMessage={() => handlerCurrentMessage(obj)}
            />
          ),
        )
        .reverse()}
    </div>
  );
};

export default React.memo(BlockMessages);
