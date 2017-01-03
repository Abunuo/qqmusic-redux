/**
 * Created by jiawei6 on 2016/11/30.
 */
import {Observable} from 'rxjs/Observable';

import {searchActions} from './actions';
import {fetchSearchSuggest, fetchSearchHot, fetchSearch} from '../../core/api';
import {SEARCH_TYPE_MAP} from '../constants';

export function loadSearchHot(action$) {
	return action$.ofType(searchActions.LOAD_SEARCH_HOT)
		.switchMap(({payload: {hasHot}}) => {
			if (hasHot) {
				return Observable.of(searchActions.showSuggestBox('other'));
			} else {
				return Observable.merge(
					Observable.of(searchActions.showSuggestBox('other')),
					fetchSearchHot()
				);
			}
		});
}

export function loadSearchSuggest(action$) {
	return action$.ofType(searchActions.LOAD_SEARCH_SUGGEST)
		.switchMap(({payload}) => {
			const {query, lastQuery, hasSuggest} = payload;
			if (lastQuery !== query || !hasSuggest) {
				return Observable.merge(
					Observable.of(searchActions.showSuggestBox('result')),
					fetchSearchSuggest(payload)
				);
			} else {
				return Observable.of(searchActions.showSuggestBox('result'));
			}
		});
}



export function loadSearch(action$) {
	return action$.ofType(searchActions.LOAD_SEARCH)
		.switchMap(({payload}) => {
			return fetchSearch(SEARCH_TYPE_MAP[payload.t], payload)
		})
}

export const searchEpics = [
	loadSearchHot,
	loadSearchSuggest,
	loadSearch
];