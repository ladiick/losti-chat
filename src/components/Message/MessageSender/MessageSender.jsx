import React from 'react';

import BlockMessage from "../BlockMessage/BlockMessage";
import MessageForward from "../MessageForward/MessageForward";
import Text from '../../ui/Text/Text'
import _ from "underscore";
import MessageAnswer from "../MessageAnswer/MessageAnswer";
import BlockAnswerMessage from "../../Chat/BlockAnswerMessage/BlockAnswerMessage";

const MessageSender = ({activeMessage, obj, handlerCurrentMessage,margin}) => {

	return (
		<>
			<BlockMessage
				style={margin ? {} : {marginBottom: 15}}
				activeMessage={activeMessage}
				pos={'left'}
				time={obj.time}
				onClick={handlerCurrentMessage}>
				{obj.message && <Text>{obj.message}</Text>}

				{obj?.forward?.length !== 0 && <MessageForward forward={obj} count={0}/>}
				{!_.isEmpty(obj?.answer) && <BlockAnswerMessage message={obj} answer/>}


			</BlockMessage>
		</>
	);
};

export default React.memo(MessageSender);
