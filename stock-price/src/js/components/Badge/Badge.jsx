import PropTypes from 'prop-types';
import React, { memo } from 'react';
import 'Styles/Badge';

const Badge = ({ text }) => (
	<div className={'badge status-color'}>
		<span>{ text }</span>
	</div>
);

Badge.propTypes = {
	text: PropTypes.string.isRequired
};

export default memo(Badge);