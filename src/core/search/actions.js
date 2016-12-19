/**
 * Created by jiawei6 on 2016/11/23.
 */
export const searchActions = {
	FETCH_SEARCH_FAILED: 'FETCH_SEARCH_FAILED',
	FETCH_SEARCH_FULFILLED: 'FETCH_SEARCH_FULFILLED',
	FETCH_SEARCH_PENDING: 'FETCH_SEARCH_PENDING',

	LOAD_SEARCH_SUGGEST: 'LOAD_SEARCH_SUGGEST',
	LOAD_SEARCH_HOT: 'LOAD_SEARCH_HOT',
	LOAD_SEARCH: 'LOAD_SEARCH',
	LOAD_SEARCH_SONG: 'LOAD_SEARCH_SONG',
	LOAD_SEARCH_ALBUM: 'LOAD_SEARCH_ALBUM',

	HIDE_SUGGEST_BOX: 'HIDE_SUGGEST_BOX',
	SHOW_SUGGEST_BOX: 'SHOW_SUGGEST_BOX',

	fetchSearchFailed: result => ({
		type: searchActions.FETCH_SEARCH_FAILED,
		payload: {
			...result
		}
	}),

	fetchSearchFulfilled: result => ({
		type: searchActions.FETCH_SEARCH_FULFILLED,
		payload: {
			...result
		}
	}),

	fetchSearchPending: result => ({
		type: searchActions.FETCH_SEARCH_PENDING,
		payload: {
			...result
		}
	}),

	loadSearchSuggest: (query, lastQuery, hasSuggest) => ({
		type: searchActions.LOAD_SEARCH_SUGGEST,
		payload: {
			query,
			lastQuery,
			hasSuggest
		}
	}),

	loadSearchHot: (hasHot) => ({
		type: searchActions.LOAD_SEARCH_HOT,
		payload: {
			hasHot: hasHot
		}
	}),

	loadSearch: (params) => ({
		type: searchActions.LOAD_SEARCH,
		payload: {
			...params
		}
	}),

	loadSearchSong: (param) => ({
		type: searchActions.LOAD_SEARCH_SONG,
		payload: {
			...param
		}
	}),

	showSuggestBox: (type) => ({
		type: searchActions.SHOW_SUGGEST_BOX,
		payload: {
			type
		}
	}),

	hideSuggestBox: () => ({
		type: searchActions.HIDE_SUGGEST_BOX,
		payload: {}
	})
};

export const searchRequestActions = {
	failed: searchActions.fetchSearchFailed,
	fulfilled: searchActions.fetchSearchFulfilled,
	pending: searchActions.fetchSearchPending
};