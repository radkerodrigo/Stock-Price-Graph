import React, { PureComponent } from 'react';
import 'Components/Badge/BadgeStyle';

export default class Badge extends PureComponent {
	render() {
		const { status, text } = this.props;

		return (
			<div className={`badge ${status}`}>
				<span>{ text }</span>
			</div>
		);
	}
}