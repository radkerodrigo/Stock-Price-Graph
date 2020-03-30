import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SymbolInfo from 'Containers/SymbolInfo';
import SymbolList from 'Containers/SymbolList';

export default () => (
	<Router>
		<div>
			<Switch>
				<Route path="/list">
					<SymbolList />
				</Route>
				<Route path="/chart">
					<SymbolInfo />
				</Route>
				<Route path="/">
					<SymbolList />
				</Route>
			</Switch>
		</div>
	</Router>
);