import React from 'react';

import BlockMessage from "../BlockMessage/BlockMessage";

const MessageRecipient = ({activeMessage, obj, handlerCurrentMessage}) => {

	return (
		<>
			<BlockMessage
				pos={'right'}
				time={obj.time}
				activeMessage={activeMessage}
				onClick={handlerCurrentMessage}>
				{obj.message}
			</BlockMessage>
		</>
	);
};

export default React.memo(MessageRecipient);
