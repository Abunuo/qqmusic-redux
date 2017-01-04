/**
 * Created by jiawei6 on 2016/12/9.
 */
import {Observable} from 'rxjs/Observable';

import {playerActions} from './actions';
import {audio} from './audio-service';
import {fetchSongInfo} from '../api'
import {localStoreActions} from '../localstore';

const savePlayerToLocal = store => localStoreActions.saveToLocal('player', store.getState().player.toJS());

function loadSong(actions$) {
	return actions$.ofType(playerActions.LOAD_SONG)
		.do(({payload: {songid}}) => audio.load(songid))
		.skip();
}

function playSong(action$) {
	return action$.ofType(playerActions.PLAY_SONG)
		.do(() => audio.play())
		.skip();
}

function pauseSong(action$) {
	return action$.ofType(playerActions.PAUSE_SONG)
		.do(() => audio.pause())
		.skip();
}

function togglePlay(action$, store) {
	return action$.ofType(playerActions.TOGGLE_PLAY)
		.switchMap(() => {
			if (store.getState().player.get('isPlaying')) {
				return Observable.of(playerActions.pauseSong());
			} else {
				return Observable.of(playerActions.playSong());

			}
		});
}

function playSelectedSong(action$, store) {
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
					Observable.of(savePlayerToLocal(store))
				)
			}
		});
}

function playNextSong(action$, store) {
	return action$.ofType(playerActions.PLAY_NEXT_SONG)
		.map(() => store.getState().player)
		.filter((player) => player.get('currentSong') && player.get('playList').size > 1)
		.switchMap((player) => {
			const currentSong = player.get('currentSong');
			const playList = player.get('playList');
			const playMode = player.get('playMode');
			const size = playList.size - 1;
			let index;
			if (playMode === 'random') {
				index = Math.round(Math.random() * size);
			} else {
				index = playList.findIndex(value => value.get('songid') === currentSong.get('songid'));
				if (index < size) {
					index += 1;
				} else {
					index = 0;
				}
			}
			return Observable.merge(
				Observable.of(playerActions.loadSong(playList.get(index).toJS())),
				Observable.of(playerActions.playSong())
			)
		});
}

function playPrevSong(action$, store) {
	return action$.ofType(playerActions.PLAY_PREV_SONG)
		.map(() => store.getState().player)
		.filter((player) => player.get('currentSong') && player.get('playList').size > 1)
		.switchMap((player) => {
			const currentSong = player.get('currentSong');
			const playList = player.get('playList');
			const playMode = player.get('playMode');
			const size = playList.size - 1;
			let index;
			if (playMode === 'random') {
				index = Math.round(Math.random() * size);
			} else {
				index = playList.findIndex(value => value.get('songid') === currentSong.get('songid'));
				if (index > 0) {
					index -= 1;
				} else {
					index = size;
				}
			}
			return Observable.merge(
				Observable.of(playerActions.loadSong(playList.get(index).toJS())),
				Observable.of(playerActions.playSong())
			);
		});
}

function seekTime(action$) {
	return action$.ofType(playerActions.SEEK_TIME)
		.do(({payload: {time}}) => audio.seek(time))
		.skip();
}

function setVolume(action$) {
	return action$.ofType(playerActions.SET_VOLUME)
		.do(({payload: {volume}}) => audio.setVolume(volume))
		.skip();
}

function mute(action$) {
	return action$.ofType(playerActions.MUTE)
		.do(({payload: {muted}}) => audio.mute(muted))
		.skip();
}

function audioEnded(action$, store) {
	return action$.ofType(playerActions.AUDIO_ENDED)
		.map(() => store.getState().player)
		.switchMap((player) => {
			const currentSong = player.get('currentSong');
			const playList = player.get('playList');
			const playMode = player.get('playMode');
			const size = playList.size - 1;
			let index;
			switch (playMode) {
				case 'random':
					index = Math.round(Math.random() * size);
					break;
				case 'list':
					index = playList.findIndex(value => value.get('songid') === currentSong.get('songid'));
					if (index < size) {
						index += 1;
					} else {
						index = 0;
					}
					break;
				case 'order':
					index = playList.findIndex(value => value.get('songid') === currentSong.get('songid'));
					if (index < size) {
						index += 1;
					} else {
						index = -1;
					}
					break;
				case 'single':
					index = playList.findIndex(value => value.get('songid') === currentSong.get('songid'));
					break;
				default:
					break;
			}

			if (index > -1) {
				const song = playList.get(index);
				return Observable.merge(
					Observable.of(playerActions.loadSong(song.toJS())),
					Observable.of(playerActions.playSong())
				);
			} else {
				Observable.empty();
			}

		});
}

function deleteSong(action$, store) {
	return action$.ofType(playerActions.DELETE_SONG)
		.map(() => savePlayerToLocal(store));
}

function initPlayer(action$, store) {
	return action$.ofType(playerActions.INIT_PLAYER)
		.switchMap(() => {
			const player = store.getState().player;
			const currentSong = player.get('currentSong');
			const isPlaying = player.get('isPlaying');
			const times = player.get('times');
			if (currentSong && isPlaying) {
				return Observable.merge(
					Observable.of(playerActions.playSelectedSong(currentSong.toJS())),
					Observable.of(playerActions.seekTime(times.get('currentTime')))
				);
			} else if (currentSong) {
				return Observable.merge(
					Observable.of(playerActions.loadSong(currentSong.toJS())),
					Observable.of(playerActions.seekTime(times.get('currentTime')))
				);
			} else {
				return Observable.empty()
			}
		})
}

function audioTimeUpdated(action$, store) {
	return action$.ofType(playerActions.AUDIO_TIME_UPDATED)
		.map(() => savePlayerToLocal(store))
}

function audioVolumeChanged(action$, store) {
	return action$.ofType(playerActions.AUDIO_VOLUME_CHANGED)
		.map(() => savePlayerToLocal(store))
}

function showPlayList(action$, store) {
	return action$.ofType(playerActions.SHOW_PLAYLIST)
		.map(() => savePlayerToLocal(store))
}

function lockPlayer(action$, store) {
	return action$.ofType(playerActions.LOCK_PLAYER)
		.map(() => savePlayerToLocal(store))
}

export const playerEpics = [
	loadSong,
	playSong,
	pauseSong,
	togglePlay,
	playSelectedSong,
	playNextSong,
	playPrevSong,
	seekTime,
	setVolume,
	mute,
	audioEnded,
	deleteSong,
	initPlayer,
	audioTimeUpdated,
	audioVolumeChanged,
	showPlayList,
	lockPlayer
];