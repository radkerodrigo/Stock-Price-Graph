import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import BadgeList from 'Components/BadgeList/BadgeList';
import LineChart from 'Components/Chart/LineChart';
import StockInfo from 'Containers/StockInfo';
import 'Styles/SymbolInfo';

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

const API_URL = 'https://financialmodelingprep.com/api/v3';

class SymbolInfo extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			badgeInfo: null,
			currentInfo: null,
			stockData: null,
			timePeriod: '5Y',
			variation: STATUS.NEUTRAL
		};

		this.setBadgeInfo = this.setBadgeInfo.bind(this);
		this.setCurrentInfo = this.setCurrentInfo.bind(this);
		this.setStockData = this.setStockData.bind(this);
		this.setVariation = this.setVariation.bind(this);
	}

	componentDidMount() {
		this.fetchData();
		this.fetchBadgeInfo();
	}

	componentDidUpdate(prevProps, prevState) {
		const { timePeriod } = this.state;

		if (timePeriod !== prevState.timePeriod)
			this.fetchData();
	}

	setBadgeInfo(badgeInfo) {
		this.setState({ badgeInfo });
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
		const initialValue = historicalData && historicalData[0].close;
		let latestValue = currentInfo && currentInfo.close;

		if (!historicalData)
			return '0.00';

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
				<div className={commonClass} onClick={this.setTimePeriod.bind(this, '1M')}>1 month</div>
				<div className={commonClass} onClick={this.setTimePeriod.bind(this, '3M')}>3 months</div>
				<div className={commonClass} onClick={this.setTimePeriod.bind(this, '1Y')}>1 year</div>
				<div className={`${commonClass} selected`} onClick={this.setTimePeriod.bind(this, '5Y')}>5 years</div>
			</nav>
		);
	}

	fetchData() {
		const { location } = this.props;
		const period = this.getPeriod(this.state.timePeriod);
		const params = `from=${period.from}&to=${period.to}`;

		fetch(`${API_URL}/historical-price-full/${location.state.symbol}?${params}`)
			.then(response => response.json())
			.then(responseData => this.setStockData(responseData));
	}

	fetchBadgeInfo() {
		const { location } = this.props;

		fetch(`${API_URL}/company/profile/${location.state.symbol}`)
			.then(response => response.json())
			.then(({ profile }) => {
				this.setBadgeInfo([profile.sector, profile.industry, profile.ceo]);
			});
	}

	getContent() {
		const { badgeInfo, currentInfo, stockData, variation } = this.state;

		if (!stockData.historical || !stockData.historical.length)
			return <span className={'no-info'}>No information available.</span>;

		return (
			<Fragment>
				<BadgeList values={badgeInfo} />
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
			</Fragment>
		);
	}

	render() {
		const { stockData, variation } = this.state;

		if (!stockData)
			return <span>Loading data...</span>;

		return (
			<div style={homeStyle} className={variation}>
				<Link className={'router-link'} to="/">Go back</Link>
				{ this.getContent() }
			</div>
		);
	}
}

SymbolInfo.propTypes = {
	location: PropTypes.object.isRequired
};

export default withRouter(SymbolInfo);