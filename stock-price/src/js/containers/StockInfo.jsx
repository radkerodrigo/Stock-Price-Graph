import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import 'Styles/ticker';

const UP_CLASS = 'goUp';
const DOWN_CLASS = 'goDown';

const variationStyle = {
	fontSize: 13,
	fontWeight: 'bold'
};

export default class StockInfo extends PureComponent {
	constructor(props) {
		super(props);

		this.previousInfo = null;
	}

	componentDidUpdate(prevProps) {
		this.previousInfo = prevProps.currentInfo;
	}

	getClass(index) {
		const { currentInfo } = this.props;
		const current = currentInfo && currentInfo.close.toFixed(2)[index];
		const previous = this.previousInfo && this.previousInfo.close.toFixed(2)[index];

		if (!previous || !current)
			return UP_CLASS;

		if (previous > current)
			return DOWN_CLASS;

		return UP_CLASS;
	}

	getSpanElements() {
		const { currentInfo, historicalData } = this.props;
		let value = currentInfo && currentInfo.close.toFixed(2);

		if (!value)
			value = historicalData[historicalData.length - 1].close.toFixed(2);

		return [...value].map((current, index) => {
			const className = this.getClass(index);

			return (
				<span key={`${current}_${index}`} className={className}>{ String(current) }</span>
			);
		});
	}

	getVariation() {
		const { currentInfo, getVariationValue, historicalData } = this.props;
		const variation = getVariationValue(historicalData, currentInfo);
		const sign = Math.sign(variation) === 1 ? '+' : '';

		return `${sign}$${variation}`;
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
				<span style={variationStyle}>
					{this.getVariation()}
				</span>
			</div>
		);
	}
}

StockInfo.propTypes = {
	currentInfo: PropTypes.object,
	getVariationValue: PropTypes.func.isRequired,
	historicalData: PropTypes.array.isRequired,
	symbol: PropTypes.string.isRequired
};

StockInfo.defaultProps = {
	currentInfo: null
};