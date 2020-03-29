import React, { useEffect } from 'react';
import Highstock from 'highcharts/highstock';
import chartOptions from 'Components/Chart/chartOptions';

const getChartData = (stockData, setCurrentInfo, color) => {
	const data = stockData.map(_data => [new Date(_data.date).getTime(), _data.close]);
	let config = { ...chartOptions };

	config.series[0].data = data;
	config.series[0].color = color;
	config.plotOptions.series.point.events.mouseOver = event => {
		setCurrentInfo(stockData[event.target.index]);
	};

	return config;
};

export default ({ color, historicalData, setCurrentInfo }) => {
	useEffect(() => {
		Highstock.stockChart('chartContainer', getChartData(historicalData, setCurrentInfo, color));
	}, []);

	return <div id={'chartContainer'} />;
};