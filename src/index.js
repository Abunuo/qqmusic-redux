import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {fromJS} from 'immutable';
import {playerActions} from './core/player';

import Root from './views/Root';
import configureStore from './core/store';

import './index.css';

const player = localStorage.getItem('player');

//load local stored player
export const store = configureStore(
	player
		? {player: fromJS(JSON.parse(localStorage.getItem('player')))}
		: undefined
);

export const dispatch = store.dispatch;

dispatch(playerActions.initPlayer());

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Root
		history={history}
		store={store}
	/>,
	document.getElementById('root')
);
