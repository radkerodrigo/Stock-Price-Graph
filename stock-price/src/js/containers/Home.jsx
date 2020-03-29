import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import BadgeList from 'Components/BadgeList/BadgeList';
import LineChart from 'Components/Chart/LineChart';
import StockInfo from 'Containers/StockInfo';
import 'Styles/Home';

const homeStyle = {
	marginLeft: 15,
	marginTop: 15
};

const POSITIVE_COLORS = {
	background: '#182b27',
	color: '#21ce99'
};
const NEGATIVE_COLORS = {
	background: '#2d201f',
	color: '#f45531'
};

const STATUS = {
	POSITIVE: 'positive',
	NEGATIVE: 'negative'
};

export default () => {
	const [stockData, setStockData] = useState();
	const [currentInfo, setCurrentInfo] = useState();

	useEffect(() => {
		if (!stockData) {
			fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2019-03-12&to=2020-03-28')
			.then(response => response.json())
			.then(responseData => setStockData(responseData));
		}
	});

	if (!stockData)
		return <span>Cargando...</span>;

	return (
		<div style={homeStyle}>
			<BadgeList status={STATUS.POSITIVE} values={['Computer Hardware', '100 Most Popular', 'Computer Software']} />
			<StockInfo currentInfo={currentInfo} historicalData={stockData.historical} symbol={stockData.symbol} />
			{ stockData && <LineChart color={POSITIVE_COLORS.color} historicalData={stockData.historical} setCurrentInfo={setCurrentInfo} /> }
		</div>
	);
};