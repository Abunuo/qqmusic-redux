import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Root from './views/Root';
import configureStore from './core/store';

import './index.css';

export const store = configureStore();
export const dispatch = store.dispatch;

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Root
		history={history}
		store={store}
	/>,
	document.getElementById('root')
);
