import React from 'react';
import Badge from 'Components/Badge/Badge';

const badgesListStyle = {
	display: 'flex'
};

export default ({ color, status, values }) => (
	<div style={badgesListStyle}>
		{
			values.map(value => <Badge key={value} text={value} status={status} />)
		}
	</div>
);