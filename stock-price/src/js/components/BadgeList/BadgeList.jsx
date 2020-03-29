import PropTypes from 'prop-types';
import React, { memo } from 'react';
import Badge from 'Components/Badge/Badge';

const badgesListStyle = {
	display: 'flex'
};

const BadgeList = ({ values }) => (
	<div style={badgesListStyle}>
		{
			values.map(value => <Badge key={value} text={value} />)
		}
	</div>
);

BadgeList.propTypes = {
	values: PropTypes.array.isRequired
};

export default memo(BadgeList);