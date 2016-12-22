/**
 * Created by jiawei6 on 2016/12/22.
 */
import {Observable} from 'rxjs/Observable';
import {localStoreActions} from './actions';
import {playerActions} from '../player';

export function saveToLocal(action$) {
	return action$.ofType(localStoreActions.SAVE_TO_LOCAL)
		.do(({payload: {key, value}}) => {
			localStorage.setItem(key, JSON.stringify(value));
		})
		.skip();
}

export function loadPlayList(action$) {
	return action$.ofType(localStoreActions.LOAD_PLAYLIST)
		.switchMap(() => Observable.of(playerActions.addSongList(JSON.parse(localStorage.getItem('playList')), true)));
}

export const localStoreEpics = [
	saveToLocal,
	loadPlayList
];