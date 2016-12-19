/**
 * Created by jiawei6 on 2016/11/22.
 */
import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import reducers from '../reducers';
import epics from '../epics';

const epicMiddleware = createEpicMiddleware(epics);

export default preloadedState => {
	let middleware = applyMiddleware(
		epicMiddleware,
		routerMiddleware(browserHistory)
	);

	if (process.env.NODE_ENV !== 'production') {
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		middleware = composeEnhancers(middleware);
	}

	const store = createStore(reducers, preloadedState, middleware);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			store.replaceReducer(require('../reducers').default)
		});
		module.hot.accept('../epics', () => {
			epicMiddleware.replaceEpic(require('../epics').default);
		});
	}

	return store;
};