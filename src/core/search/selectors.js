/**
 * Created by jiawei6 on 2016/11/24.
 */
export function getSearch(state) {
	return state.search;
}

export function getSearchHot(state) {
	return getSearch(state).hot;
}

export function getSearchSuggest(state) {
	return getSearch(state).suggest;
}

export function getSearchSong(state) {
	return getSearch(state).song;
}