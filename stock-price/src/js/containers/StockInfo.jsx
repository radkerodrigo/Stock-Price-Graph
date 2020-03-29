import React, { PureComponent } from 'react';
import 'Styles/ticker';

const UP_CLASS = 'goUp';
const DOWN_CLASS = 'goDown';

export default class StockInfo extends PureComponent {
	constructor(props) {
		super(props);

		this.previousInfo = null;
	}

	componentWillUpdate() {
		this.previousInfo = this.props.currentInfo;
	}

	getClass(index) {
		const current = this.props.currentInfo && this.props.currentInfo.close.toFixed(2)[index];
		const previous = this.previousInfo && this.previousInfo.close.toFixed(2)[index];

		if (!previous || !current)
			return UP_CLASS;

		if (previous > current)
			return DOWN_CLASS;

		return UP_CLASS;
	}

	getSpanElements() {
		const { currentInfo, historicalData } = this.props;
		const value = currentInfo ? currentInfo.close.toFixed(2) : historicalData[historicalData.length - 1].close.toFixed(2);

		return [...value].map((current, index) => {
			const className = this.getClass(index);

			return (
				<span key={`${current}_${index}`} className={className}>{ String(current) }</span>
			);
		});
	}

	render() {
		const { symbol } = this.props;

		return (
			<div>
				<h1>{ symbol }</h1>
				<h2>
					<span>$</span>
					{ this.getSpanElements() }
				</h2>
			</div>
		);
	}
};