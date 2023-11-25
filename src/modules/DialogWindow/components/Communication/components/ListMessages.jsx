// import { helperMessage } from "../../../../../utils/utils";
import Message from "../../Message/Message";

const ListMessages = ({ message, handlerCurrentMessage }) => (
  <>
    {/* <Message
      key={`${message?.time}_time`}
      obj={{
        type: "Date",
        message: message?.time,
      }}
    /> */}
    <Message
      key={message.id}
      obj={message}
      margin={true}
      handlerCurrentMessage={() => handlerCurrentMessage(message)}
    />
    {/* {message?.messages
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
      .reverse()} */}
  </>
);

export default ListMessages;
