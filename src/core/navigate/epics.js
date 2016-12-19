/**
 * Created by jiawei6 on 2016/11/30.
 */
import {push} from 'react-router-redux';
import {Observable} from 'rxjs/Observable';

import {nagivateActions} from './actions';
import {searchActions} from '../search';

export function navigateTo(action$) {
	return action$.ofType(nagivateActions.NAVIGATE_TO)
		.map(action => push(action.payload.pathname));
}

export function navigateToSearch(action$) {
	return action$.ofType(nagivateActions.NAVIGATE_TO_SEARCH)
		.mergeMap(action => {
			const {pathname, currentSearch, lastSearch} = action.payload;
			if (lastSearch === currentSearch) {
				return Observable.of(push(pathname));
			} else {
				return Observable.merge(
					Observable.of(searchActions.loadSearch({
						w: currentSearch,
						catZhida: 1,
						p: 1,
						n: 20,
						t: 0,
						//aggr: 1,
						cr: 1
					})),
					Observable.of(push(pathname))
				)
			}
		})
		//.map(action => push(action.payload.pathname));
}

export const navigateEpics = [
	navigateTo,
	navigateToSearch
];

