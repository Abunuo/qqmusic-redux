/**
 * Created by jiawei6 on 2016/11/24.
 */
export function getSearch(state) {
	return state.search;
}

export function getSearchSong(state) {
	return getSearch(state).song;
}

export function getSearchAlbum(state) {
	return getSearch(state).album;
}

export function getSearchMV(state) {
	return getSearch(state).mv;
}