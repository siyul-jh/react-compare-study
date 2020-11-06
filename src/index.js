import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Route from './route';

ReactDOM.render(
	<BrowserRouter>
		<Route />
	</BrowserRouter>,
	document.getElementById('root'),
);
