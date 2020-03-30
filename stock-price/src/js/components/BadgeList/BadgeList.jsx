import PropTypes from 'prop-types';
import React, { memo } from 'react';
import Badge from 'Components/Badge/Badge';

const badgesListStyle = {
	display: 'flex',
	marginTop: 15
};

const BadgeList = ({ values }) => {
	let valueList;

	if (values === null)
		return <span>Fetching badge info.</span>;

	valueList = values.filter(current => Boolean(current) === true);

	if (!valueList.length)
		valueList = ['Information not available'];

	return (
		<div style={badgesListStyle}>
			{
				valueList.map(value => <Badge key={value} text={value} />)
			}
		</div>
	);
};

BadgeList.propTypes = {
	values: PropTypes.array
};

BadgeList.defaultProps = {
	values: null
};

export default memo(BadgeList);