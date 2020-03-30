import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import 'Styles/SymbolList';

const onRowClick = (history, event) => {
	history.push({
		pathname: '/chart',
		state: {
			symbol: event.rowData.symbol
		}
	});
};

const SymbolList = ({ history }) => {
	const [symbolsList, setSymbolsList] = useState([]);

	useEffect(() => {
		fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
			.then(response => response.json())
			.then(responseData => setSymbolsList(responseData.symbolsList));
	}, []);

	if (!symbolsList.length)
		return <span>Fetching data, please wait.</span>;

	return (
		<Table
			width={600}
			height={600}
			headerHeight={20}
			rowHeight={30}
			rowCount={symbolsList.length}
			onRowClick={event => onRowClick(history, event)}
			rowGetter={({ index }) => symbolsList[index]}
		>
			<Column width={100} label={'Symbol'} dataKey={'symbol'} />
			<Column width={300} label={'Name'} dataKey={'name'} />
			<Column width={100} label={'Price($)'} dataKey={'price'} />
		</Table>
	);
};

SymbolList.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(SymbolList);