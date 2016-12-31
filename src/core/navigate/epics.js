/**
 * Created by jiawei6 on 2016/11/30.
 */
import {push} from 'react-router-redux';

import {nagivateActions} from './actions';

export function navigateTo(action$) {
	return action$.ofType(nagivateActions.NAVIGATE_TO)
		.map(action => push(action.payload.pathname));
}

export function navigateToSearch(action$) {
	return action$.ofType(nagivateActions.NAVIGATE_TO_SEARCH)
		.map(action => push(action.payload.pathname));
}

export const navigateEpics = [
	navigateTo,
	navigateToSearch
];

