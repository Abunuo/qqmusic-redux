/**
 * Created by jiawei6 on 2016/12/6.
 */
import {singerActions} from './actions';
import {fetchSingerSong, fetchSingerAlbum, fetchSingerSimilar, fetchSingerData} from '../../core/api';

export function loadSingerSong(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_SONG)
		.mergeMap(action => {
			return fetchSingerSong(action.payload)
		})
}

export function loadSingerData(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_DATA)
		.mergeMap(action => {
			return fetchSingerData(action.payload)
		})
}

export function loadSingerAlbum(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_ALBUM)
		.mergeMap(action => {
			return fetchSingerAlbum(action.payload)
		})
}

export function loadSingerSimilar(action$) {
	return action$.ofType(singerActions.LOAD_SINGER_SIMILAR)
		.mergeMap(action => {
			return fetchSingerSimilar(action.payload)
		})
}

export const singerEpics = [
	loadSingerSong,
	loadSingerData,
	loadSingerAlbum,
	loadSingerSimilar
];