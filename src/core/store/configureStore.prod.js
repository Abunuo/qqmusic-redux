/**
 * Created by jiawei6 on 2016/11/22.
 */
import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

import reducers from '../reducers';
import ecips from '../epics';

const ecipMiddleware = createEpicMiddleware(ecips);

export default preloadedState => {

	let middleware = applyMiddleware(
		ecipMiddleware,
		routerMiddleware(browserHistory)
	);

	return createStore(reducers, preloadedState, middleware);
};