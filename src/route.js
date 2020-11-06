import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import ClassType from './classType';
import FunctionType from './functionType';

export default function Router() {
	return (
		<>
			<Route exact path='/' component={App} />
			<Route exact path='/class' component={ClassType} />
			<Route exact path='/function' component={FunctionType} />
		</>
	);
}
