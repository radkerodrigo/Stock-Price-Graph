import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import Highstock from 'highcharts/highstock';
import chartOptions from 'Components/Chart/chartOptions';

const getChartData = (stockData, setCurrentInfo, color) => {
	const data = stockData.map(_data => [new Date(_data.date).getTime(), _data.close]);
	const config = { ...chartOptions };

	config.series[0].data = data;
	config.series[0].color = color;
	config.plotOptions.series.point.events.mouseOver = event => {
		setCurrentInfo(stockData[event.target.index]);
	};

	return config;
};

const LineChart = ({ color, historicalData, setCurrentInfo }) => {
	useEffect(() => {
		Highstock.stockChart('chartContainer', getChartData(historicalData, setCurrentInfo, color));
	}, [color, historicalData]);

	return <div id={'chartContainer'} />;
};

LineChart.propTypes = {
	color: PropTypes.string.isRequired,
	historicalData: PropTypes.array.isRequired,
	setCurrentInfo: PropTypes.func.isRequired
};

export default memo(LineChart);