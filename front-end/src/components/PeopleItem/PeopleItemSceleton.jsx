import React from 'react'
import ContentLoader from 'react-content-loader'

const PeopleItemSceleton = () => {
	return (
		<ContentLoader
			speed={2}
			height={50}
			width={300}
			viewBox="0 0 300 50"
			backgroundColor="#f3f3f3"
			foregroundColor="orange"
		>
			<rect x="0" y="0" rx="0" ry="0" width="274" height="1" />
			<rect x="0" y="0" rx="0" ry="0" width="1" height="49" />
			<rect x="273" y="0" rx="0" ry="0" width="1" height="49" />
			<rect x="0" y="49" rx="0" ry="0" width="274" height="1" />
			
			<circle cx="27" cy="25" r="19" />
			<circle cx="260" cy="40" r="5" />
			
			<rect x="60" y="14" rx="3" ry="3" width="170" height="13" />
			<rect x="60" y="30" rx="3" ry="3" width="10" height="10" />
			<rect x="245" y="15.5" rx="3" ry="3" width="20" height="10" />
			<rect x="75" y="30" rx="3" ry="3" width="85" height="10" />
			<rect x="219" y="146" rx="0" ry="0" width="0" height="0" />
		</ContentLoader>
	)
}

export default PeopleItemSceleton