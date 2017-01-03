/**
 * Created by jiawei6 on 2016/12/13.
 */
import {Observable} from 'rxjs/Observable';

import {toplistActions} from './actions';
import {fetchToplistAll, fetchToplistOne} from '../../core/api';

export function loadToplistAll(action$) {
	return action$.ofType(toplistActions.LOAD_TOPLIST_ALL)
		.switchMap(({payload}) => fetchToplistAll(payload))
}

export function loadToplistOne(action$, store) {
	return action$.ofType(toplistActions.LOAD_TOPLIST_ONE)
		.switchMap(({payload}) => {
			if (store.getState().toplist.all) {
				return fetchToplistOne(payload);
			} else {
				return Observable.merge(
					Observable.of(toplistActions.loadToplistAll()),
					fetchToplistOne(payload)
				);
			}
		})
}

export const toplistEpics = [
	loadToplistAll,
	loadToplistOne
];