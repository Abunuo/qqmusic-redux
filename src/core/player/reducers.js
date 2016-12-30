/**
 * Created by jiawei6 on 2016/12/8.
 */
import {List, Map} from 'immutable';

import {playerActions} from './actions';
import {PLAY_MODE} from '../../core/constants';

const PlayerTimesState = {
	bufferedTime: 0,
	currentTime: 0,
	duration: 0,
	percentBuffered: '0%',
	percentCompleted: '0%'
};

const PlayerState = {
	isPlaying: false,
	volume: 1,
	times: new Map(PlayerTimesState),
	playMode: 'list', // order 顺序播放 random 随机播放 single 单曲循环 list 列表循环
	playList: new List(),
	currentSong: null,
	muted: false,
	playListIsShow: false,
	playerIsShow: true
};

export function playerReducer(state = new Map(PlayerState), {payload, type}) {
	const playList = state.get('playList');
	const playMode = state.get('playMode');
	let index;
	switch (type) {

		case playerActions.AUDIO_ENDED:
			return state.merge({
				times: new Map(PlayerTimesState),
				isPlaying: false
			});

		case playerActions.AUDIO_PAUSED:
			return state.set('isPlaying', false);

		case playerActions.AUDIO_PLAYING:
			return state.set('isPlaying', true);

		case playerActions.AUDIO_VOLUME_CHANGED:
			return state.set('volume', payload.volume);

		case playerActions.AUDIO_TIME_UPDATED:
			return state.set('times', state.get('times').merge(payload));


		case playerActions.LOAD_SONG:
			return state.set('currentSong', new Map(payload));

		case playerActions.PLAY_SELECTED_SONG:
			if (payload.isMid) {
				return state;
			}
			if (playList.find((value) => value.get('songid') === payload.songid)) {
				return state;
			} else {
				const {data, musicData} = payload;
				const {
					interval,
					singer,
					songname,
					albummid,
					songid,
					albumname
				} = data || musicData ||payload;
				return state.set('playList', playList.push(new Map({
					interval,
					singer,
					songname,
					albummid,
					songid,
					albumname
				})));
			}

		case playerActions.SET_VOLUME:
			return state.set('volume', payload.volume);

		case playerActions.MUTE:
			return state.set('muted', payload.muted);

		case playerActions.SWITCH_PLAYMODE:
			index = PLAY_MODE.indexOf(playMode);
			if (index < PLAY_MODE.length - 1) {
				index++;
			} else {
				index = 0;
			}
			return state.set('playMode', PLAY_MODE[index]);

		case playerActions.SHOW_PLAYLIST:
			return state.set('playListIsShow', payload.bool);

		case playerActions.SHOW_PLAYER:
			return state.set('playerIsShow', payload.bool);

		case playerActions.DELETE_SONG:
			index = playList.findIndex((value) => value.get('songid') === payload.songid);
			if (~index) {
				return state.set('playList', playList.delete(index));
			}
			return state;

		case playerActions.ADD_SONGLIST:
			const {songList, isReplace} = payload;
			return state.set('playList', isReplace ? new List(songList) : playList.concat(songList));

		default:
			return state;
	}
}