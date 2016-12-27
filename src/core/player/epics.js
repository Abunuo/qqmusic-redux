/**
 * Created by jiawei6 on 2016/12/9.
 */
import {Observable} from 'rxjs/Observable';

import {playerActions} from './actions';
import {audio} from './audio-service';
import {fetchSongInfo} from '../api'
import {localStoreActions} from '../localstore';

function loadSong(actions$) {
	return actions$.ofType(playerActions.LOAD_SONG)
		.do(({payload}) => {
			audio.load(payload.songid)
		})
		.skip();
}

function playSong(action$) {
	return action$.ofType(playerActions.PLAY_SONG)
		.do(() => {
			audio.play();
		})
		.skip();
}

function pauseSong(action$) {
	return action$.ofType(playerActions.PAUSE_SONG)
		.do(() => {
			audio.pause();
		})
		.skip();
}

function playSelectedSong(action$, state) {
	return action$.ofType(playerActions.PLAY_SELECTED_SONG)
		.map(({payload}) => {
			if (payload.isMid) {
				return payload;
			} else {
				const {data, musicData} = payload;
				return data || musicData || payload;
			}
		})
		.filter(payload => {
			return (!payload.isMid && payload.songid) || (payload.isMid && payload.mid);
		})
		.switchMap(payload => {
			if (payload.isMid) {
				return fetchSongInfo({
					songmid: payload.mid
				})
					.filter(({type}) => type === playerActions.FETCH_SONG_INFO_FULFILLED)
					.switchMap(({payload: {result: {data}}}) => {
						const {name: songname, album: {mid: albummid, name: albumname}, id: songid, singer, interval} = data[0];
						return Observable.of(playerActions.playSelectedSong({
							interval,
							singer,
							songname,
							albummid,
							songid,
							albumname
						}));
					})
			} else {
				return Observable.merge(
					Observable.of(playerActions.loadSong(payload)),
					Observable.of(playerActions.playSong()),
					Observable.of(localStoreActions.saveToLocal('playList', state.getState().player.get('playList').toJS()))
				)
			}
		});
}

function playNextSong(action$, state) {
	return action$.ofType(playerActions.PLAY_NEXT_SONG)
		.map(() => state.getState().player)
		.filter(({currentSong, playList}) => currentSong && playList.size > 1)
		.switchMap(({currentSong, playList, playMode}) => {
			const size = playList.size - 1;
			let index;
			if (playMode === 'random') {
				index = Math.round(Math.random() * size);
			} else {
				index = playList.findIndex(value => value.songid === currentSong.songid);
				if (index < size) {
					index += 1;
				} else {
					index = 0;
				}
			}
			return Observable.merge(
				Observable.of(playerActions.loadSong(playList.get(index))),
				Observable.of(playerActions.playSong())
			)
		});
}

function playPrevSong(action$, state) {
	return action$.ofType(playerActions.PLAY_PREV_SONG)
		.map(() => state.getState().player)
		.filter(({currentSong, playList}) => currentSong && playList.size > 1)
		.switchMap(({currentSong, playList, playMode}) => {
			const size = playList.size - 1;
			let index;
			if (playMode === 'random') {
				index = Math.round(Math.random() * size);
			} else {
				index = playList.findIndex(value => value.songid === currentSong.songid);
				if (index > 0) {
					index -= 1;
				} else {
					index = size;
				}
			}
			return Observable.merge(
				Observable.of(playerActions.loadSong(playList.get(index))),
				Observable.of(playerActions.playSong())
			);
		});
}

function seekTime(action$) {
	return action$.ofType(playerActions.SEEK_TIME)
		.do(({payload}) => {
			audio.seek(payload.time);
		})
		.skip();
}

function setVolume(action$) {
	return action$.ofType(playerActions.SET_VOLUME)
		.do(({payload}) => {
			audio.setVolume(payload.volume);
		})
		.skip();
}

function mute(action$) {
	return action$.ofType(playerActions.MUTE)
		.do(({payload}) => {
			audio.mute(payload.muted);
		})
		.skip();
}

function audioEnded(action$, state) {
	return action$.ofType(playerActions.AUDIO_ENDED)
		.map(() => state.getState().player)
		.switchMap(({currentSong, playList, playMode}) => {
			const size = playList.size - 1;
			let index;
			switch (playMode) {
				case 'random':
					index = Math.round(Math.random() * size);
					break;
				case 'list':
					index = playList.findIndex(value => value.songid === currentSong.songid);
					if (index < size) {
						index += 1;
					} else {
						index = 0;
					}
					break;
				case 'order':
					index = playList.findIndex(value => value.songid === currentSong.songid);
					if (index < size) {
						index += 1;
					} else {
						index = -1;
					}
					break;
				case 'single':
					index = playList.findIndex(value => value.songid === currentSong.songid);
					break;
				default:
					break;
			}

			if (index > -1) {
				const song = playList.get(index);
				return Observable.merge(
					Observable.of(playerActions.loadSong(song)),
					Observable.of(playerActions.playSong())
				);
			}

		});
}

function deleteSong(action$, state) {
	return action$.ofType(playerActions.DELETE_SONG)
		.switchMap(() => Observable.of(localStoreActions.saveToLocal('playList', state.getState().player.get('playList').toJS())));
}

export const playerEpics = [
	loadSong,
	playSong,
	pauseSong,
	playSelectedSong,
	playNextSong,
	playPrevSong,
	seekTime,
	setVolume,
	mute,
	audioEnded,
	deleteSong
];