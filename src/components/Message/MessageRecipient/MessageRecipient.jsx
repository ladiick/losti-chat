import React from 'react';
import _ from "underscore";
import BlockMessage from "../BlockMessage/BlockMessage";
import MessageForward from "../MessageForward/MessageForward";
import Text from '../../ui/Text/Text'
import BlockAnswerMessage from "../../Chat/BlockAnswerMessage/BlockAnswerMessage";
import MessageImage from "../MessageImage/MessageImage";

const MessageRecipient = ({activeMessage, obj, handlerCurrentMessage, margin}) => {

	return (
		<>
			<BlockMessage
				style={margin ? {} : {marginBottom: 15}}
				pos={'right'}
				time={obj.time}
				activeMessage={activeMessage}
				onClick={handlerCurrentMessage}>
				{obj.message && <Text >{obj.message}</Text>}

				{obj?.images?.length !== 0 && <MessageImage images={obj?.images}/>}

				{obj?.forward?.length !== 0 && <MessageForward forward={obj} count={0}/>}

				{!_.isEmpty(obj?.answer) && <BlockAnswerMessage message={obj?.answer} answer/>}

			</BlockMessage>
		</>
	);
};

export default React.memo(MessageRecipient);
