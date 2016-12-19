/**
 * Created by jiawei6 on 2016/12/7.
 */
import {albumActions} from './actions';
import {fetchAlbum} from '../../core/api';

export function loadAlbum(action$) {
	return action$.ofType(albumActions.LOAD_ALBUM)
		.mergeMap(action => {
			return fetchAlbum(action.payload)
		})
}

export const albumEpics = [
	loadAlbum
];