/**
 * Created by jiawei6 on 2016/11/30.
 */
import {searchActions} from './actions';
import {fetchSearchSuggest, fetchSearchHot, fetchSearch} from '../../core/api';


import {Observable} from 'rxjs/Observable';

export function loadSearchHot(action$) {
	return action$.ofType(searchActions.LOAD_SEARCH_HOT)
		.mergeMap((action) => {
			const hasHot = action.payload.hasHot;
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
		.mergeMap((action) => {
			const {query, lastQuery, hasSuggest} = action.payload;
			if (lastQuery !== query || !hasSuggest) {
				return Observable.merge(
					Observable.of(searchActions.showSuggestBox('result')),
					fetchSearchSuggest(action.payload)
				);
			} else {
				return Observable.of(searchActions.showSuggestBox('result'));
			}
		});
}


const TypeMap = {
	0: 'song',
	7: 'lyric',
	8: 'album',
	12: 'mv'
};

export function loadSearch(action$) {
	return action$.ofType(searchActions.LOAD_SEARCH)
		.mergeMap(action => {
			return fetchSearch(TypeMap[action.payload.t], action.payload)
		})
}

export const searchEpics = [
	loadSearchHot,
	loadSearchSuggest,
	loadSearch
];