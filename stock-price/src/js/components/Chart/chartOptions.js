export default {
	chart: {
		height: 400,
		width: 800,
		backgroundColor: '#1b1b1d'
	},
	rangeSelector: {
		selected: 4,
		buttons: [{
			type: 'day',
			count: 1,
			text: '1D'
		}, {
			type: 'week',
			count: 1,
			text: '1W'
		}, {
			type: 'month',
			count: 1,
			text: '1M'
		}, {
			type: 'month',
			count: 3,
			text: '3M'
		}, {
			type: 'year',
			count: 1,
			text: '1Y'
		}, {
			type: 'year',
			count: 5,
			text: '5Y'
		}],
		inputEnabled: false
	},
	navigator: {
		enabled: false
	},
	scrollbar: {
		enabled: false
	},
	title: {
		text: ''
	},
	xAxis: {
		labels: {
			enabled: false
		},
		crosshair: {
			label: {
				enabled: true
			}
		}
	},
	yAxis: {
		labels: {
			enabled: false
		},
		gridLineWidth: 0
	},
	plotOptions: {
		series: {
			point: {
				events: {}
			}
		}
	},
	tooltip: {
		enabled: false
	},
	series: [{
		name: 'AAPL'
	}],
	credits: false
};