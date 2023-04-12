import React from 'react';

import BlockMessage from "../BlockMessage/BlockMessage";
import MessageForward from "../MessageForward/MessageForward";
import Text from '../../ui/Text/Text'

const MessageSender = ({activeMessage, obj, handlerCurrentMessage}) => {

	return (
		<>
			<BlockMessage
				activeMessage={activeMessage}
				pos={'left'}
				time={obj.time}
				onClick={handlerCurrentMessage}>
				{obj.message && <Text>{obj.message}</Text>}

				{obj?.forward?.length !== 0 && <MessageForward forward={obj}/>}


			</BlockMessage>
		</>
	);
};

export default React.memo(MessageSender);
