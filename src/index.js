import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';//GitHub pages를 사용할 때는 HashRouter를 사용한다.
// import { BrowserRouter } from 'react-router-dom';
import Route from './route';

ReactDOM.render(
	// <BrowserRouter>
	<HashRouter>
		<Route />
	</HashRouter>,
	// </BrowserRouter>,
	document.getElementById('root'),
);
