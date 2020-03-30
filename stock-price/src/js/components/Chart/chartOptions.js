export default {
	chart: {
		height: 360,
		width: 800,
		backgroundColor: '#1b1b1d'
	},
	rangeSelector: {
		enabled: false
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