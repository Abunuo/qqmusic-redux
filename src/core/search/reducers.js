/**
 * Created by jiawei6 on 2016/11/23.
 */
import {Record} from 'immutable';

import {searchActions} from './actions';

export const SearchState = new Record({
	currentQuery: null,
	lastQuery: null,
	lastSearch: null,
	showSuggestBox: false,
	suggest: null,
	hot: null,
	pending: false,
	song: null,
	mv: null,
	album: null,
	tracklist: null,
	singer: null
});

export function searchReducer(state = new SearchState(), action) {
	const {payload} = action;

	switch (action.type) {
		case searchActions.LOAD_SEARCH_SUGGEST:
			return state.merge({
				currentQuery: payload.query
			});
		case searchActions.FETCH_SEARCH_PENDING:
			return state.merge({
				pending: true
			});
		case searchActions.FETCH_SEARCH_FAILED:
			return state.merge({
				pending: false
			});
		case searchActions.FETCH_SEARCH_FULFILLED:
			const re = {
				pending: false,
				[payload.type]: payload.result.data
			};
			payload.type === 'suggest' && (re.lastQuery = payload.param.query);
			~['song'].indexOf(payload.type) && (re.lastSearch = payload.param.w);
			return state.merge(re);
		case searchActions.SHOW_SUGGEST_BOX:
			return state.merge({
				showSuggestBox: payload.type
			});
		case searchActions.HIDE_SUGGEST_BOX:
			return state.merge({
				showSuggestBox: false
			});
		default:
			return state;
	}
}