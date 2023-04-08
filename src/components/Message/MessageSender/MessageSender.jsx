import React from 'react';

import BlockMessage from "../BlockMessage/BlockMessage";

const MessageSender = ({activeMessage, obj, handlerCurrentMessage}) => {

	return (
		<>
			<BlockMessage
				activeMessage={activeMessage}
				pos={'left'}
				time={obj.time}
				onClick={handlerCurrentMessage}>
				{obj.message}
			</BlockMessage>
		</>
	);
};

export default React.memo(MessageSender);
