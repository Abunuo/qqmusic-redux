/**
 * Created by jiawei6 on 2016/12/6.
 */
import {singerActions} from './actions';
import {fetchSingerSong, fetchSingerAlbum, fetchSingerSimilar, fetchSingerData, fetchSingerMV} from '../../core/api';

export function loadSingerSong(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_SONG)
		.switchMap(({payload}) => fetchSingerSong(payload))
}

export function loadSingerData(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_DATA)
		.switchMap(({payload}) => fetchSingerData(payload))
}

export function loadSingerAlbum(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_ALBUM)
		.switchMap(({payload}) => fetchSingerAlbum(payload))
}

export function loadSingerMV(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_MV)
		.switchMap(({payload}) => fetchSingerMV(payload))
}

export function loadSingerSimilar(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_SIMILAR)
		.switchMap(({payload}) => fetchSingerSimilar(payload))
}

export const singerEpics = [
	loadSingerSong,
	loadSingerData,
	loadSingerAlbum,
	loadSingerSimilar,
	loadSingerMV
];