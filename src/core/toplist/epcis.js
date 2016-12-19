/**
 * Created by jiawei6 on 2016/12/13.
 */
import {Observable} from 'rxjs/Observable';

import {toplistActions} from './actions';
import {fetchToplistAll, fetchToplistOne} from '../../core/api';

export function loadToplistAll(action$) {
	return action$.ofType(toplistActions.LOAD_TOPLIST_ALL)
		.mergeMap(action => {
			return fetchToplistAll(action.payload);
		})
}

export function loadToplistOne(action$, state) {
	return action$.ofType(toplistActions.LOAD_TOPLIST_ONE)
		.mergeMap(action => {
			if (state.getState().toplist.all) {
				return fetchToplistOne(action.payload);
			} else {
				return Observable.merge(
					Observable.of(toplistActions.loadToplistAll()),
					fetchToplistOne(action.payload)
				);
			}
		})
}

export const toplistEpics = [
	loadToplistAll,
	loadToplistOne
];