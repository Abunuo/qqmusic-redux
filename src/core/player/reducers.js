/**
 * Created by jiawei6 on 2016/12/8.
 */
import {Record, List} from 'immutable';

import {playerActions} from './actions';
import {PLAY_MODE} from '../../core/constants';

const PlayerTimesState = new Record({
	bufferedTime: 0,
	currentTime: 0,
	duration: 0,
	percentBuffered: '0%',
	percentCompleted: '0%'
});

const PlayerState = new Record({
	isPlaying: false,
	volume: 1,
	times: new PlayerTimesState(),
	playMode: 'list', // order 顺序播放 random 随机播放 single 单曲循环 list 列表循环
	playList: new List(),
	currentSong: null,
	muted: false,
	playListIsShow: false
});

export function playerReducer(state = new PlayerState(), {payload, type}) {
	const {playList, playMode} = state;
	let index;
	switch (type) {

		case playerActions.AUDIO_ENDED:
			return state.merge({
				times: new PlayerTimesState(),
				isPlaying: false
			});

		case playerActions.AUDIO_PAUSED:
			return state.set('isPlaying', false);

		case playerActions.AUDIO_PLAYING:
			return state.set('isPlaying', true);

		case playerActions.AUDIO_VOLUME_CHANGED:
			return state.set('volume', payload.volume);

		case playerActions.AUDIO_TIME_UPDATED:
			return state.set('times', state.times.merge(payload));


		case playerActions.LOAD_SONG:
			return state.set('currentSong', payload);

		case playerActions.PLAY_SELECTED_SONG:
			if (payload.isMid) {
				return state;
			}
			if (playList.find((value) => value.songid === payload.songid)) {
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
				return state.set('playList', playList.push({
					interval,
					singer,
					songname,
					albummid,
					songid,
					albumname
				}));
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

		case playerActions.DELETE_SONG:
			index = playList.findIndex((value) => value.songid === payload.songid);
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