import React, { PureComponent } from 'react';
import BadgeList from 'Components/BadgeList/BadgeList';
import LineChart from 'Components/Chart/LineChart';
import StockInfo from 'Containers/StockInfo';
import 'Styles/Home';

const homeStyle = {
	marginLeft: 15,
	marginTop: 15
};

const POSITIVE_COLOR = '#21ce99';

const NEGATIVE_COLOR = '#f45531';

const NEUTRAL_COLOR = '#2199ce';

const STATUS = {
	POSITIVE: 'positive',
	NEGATIVE: 'negative',
	NEUTRAL: 'neutral'
};

const BADGES_LIST = ['Computer Hardware', '100 Most Popular', 'Computer Software'];

export default class Home extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			currentInfo: null,
			stockData: null,
			timePeriod: '5Y',
			variation: STATUS.NEUTRAL
		};

		this.setCurrentInfo = this.setCurrentInfo.bind(this);
		this.setStockData = this.setStockData.bind(this);
		this.setVariation = this.setVariation.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState) {
		const { timePeriod } = this.state;

		if (timePeriod !== prevState.timePeriod)
			this.fetchData();
	}

	setCurrentInfo(currentInfo) {
		this.setState({ currentInfo });
	}

	setStockData(stockData) {
		this.setState({
			currentInfo: null,
			stockData
		}, () => {
			const variationValue = this.getVariationValue(stockData.historical);
			const status = this.getVariationStatus(variationValue);

			this.setVariation(status);
		});
	}

	setTimePeriod(timePeriod, event) {
		document.querySelector('.period-selector.selected').classList.remove('selected');
		event.target.classList.add('selected');

		this.setState({ timePeriod });
	}

	setVariation(variation) {
		this.setState({ variation });
	}

	getChartColor(variation) {
		if (variation === STATUS.NEGATIVE)
			return NEGATIVE_COLOR;

		if (variation === STATUS.POSITIVE)
			return POSITIVE_COLOR;

		return NEUTRAL_COLOR;
	}

	getVariationValue(historicalData, currentInfo) {
		const initialValue = historicalData[0].close;
		let latestValue = currentInfo && currentInfo.close;

		if (!latestValue)
			latestValue = historicalData[historicalData.length - 1].close;

		return (latestValue - initialValue).toFixed(2);
	}

	getVariationStatus(variationValue) {
		if (variationValue === '0.00')
			return STATUS.NEUTRAL;

		return variationValue > 0 ? STATUS.POSITIVE : STATUS.NEGATIVE;
	}

	getPeriod(timePeriod) {
		if (timePeriod.endsWith('Y'))
			return this.getYearPeriod(timePeriod);

		return this.getMonthPeriod(timePeriod);
	}

	getYearPeriod(timePeriod) {
		const currentDate = new Date();
		const partialDate = `-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
		const currentYear = currentDate.getFullYear();
		const initialYear = currentYear - Number(timePeriod.replace('Y', ''));

		return {
			from: initialYear + partialDate,
			to: currentYear + partialDate
		};
	}

	getMonthPeriod(timePeriod) {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth() + 1;
		const currentYear = currentDate.getFullYear();
		const currentDay = currentDate.getDate();
		let initialMonth = currentMonth - Number(timePeriod.replace('M', ''));
		let initialYear = currentYear;

		if (initialMonth <= 0) {
			initialYear -= 1;
			initialMonth = 12 + initialMonth;
		}

		return {
			from: `${initialYear}-${initialMonth}-${currentDay}`,
			to: `${currentYear}-${currentMonth}-${currentDay}`
		};
	}

	getPeriodSelectors() {
		const commonClass = 'status-color status-hover period-selector';

		return (
			<nav>
				<a className={commonClass} href={'#'} onClick={this.setTimePeriod.bind(this, '1M')}>1 month</a>
				<a className={commonClass} href={'#'} onClick={this.setTimePeriod.bind(this, '3M')}>3 months</a>
				<a className={commonClass} href={'#'} onClick={this.setTimePeriod.bind(this, '1Y')}>1 year</a>
				<a className={`${commonClass} selected`} href={'#'} onClick={this.setTimePeriod.bind(this, '5Y')}>5 years</a>
			</nav>
		);
	}

	fetchData() {
		const period = this.getPeriod(this.state.timePeriod);
		const params = `from=${period.from}&to=${period.to}`;

		fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?${params}`)
			.then(response => response.json())
			.then(responseData => this.setStockData(responseData));
	}

	render() {
		const { currentInfo, stockData, variation } = this.state;

		if (!stockData)
			return <span>Loading data...</span>;

		return (
			<div style={homeStyle} className={variation}>
				<BadgeList values={BADGES_LIST} />
				<StockInfo
					currentInfo={currentInfo}
					historicalData={stockData.historical}
					symbol={stockData.symbol}
					getVariationValue={this.getVariationValue}
				/>
				<LineChart
					color={this.getChartColor(variation)}
					historicalData={stockData.historical}
					setCurrentInfo={this.setCurrentInfo}
				/>
				{ this.getPeriodSelectors() }
			</div>
		);
	}
}