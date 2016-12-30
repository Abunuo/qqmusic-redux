/**
 * Created by jiawei6 on 2016/12/9.
 */
import {playerActions} from './actions';
import {Observable} from 'rxjs/Observable';

import {dispatch} from '../../';
import {API_PLAY_URL} from '../constants';

let _audio = new Audio();
let lastMid;

function getTime(event) {
	const { buffered, currentTime, duration } = event.target;
	const bufferedTime = buffered.length ? buffered.end(0) : 0;

	return {
		bufferedTime,
		currentTime,
		duration,
		percentBuffered: `${(bufferedTime / duration * 100) || 0}%`,
		percentCompleted: `${(currentTime / duration * 100) || 0}%`
	};
}

Observable.fromEvent(_audio, 'ended')
	.subscribe(() => {
		dispatch(playerActions.audioEnded())
	});

Observable.fromEvent(_audio, 'pause')
	.subscribe(() => {
		dispatch(playerActions.audioPaused())
	});

Observable.fromEvent(_audio, 'playing')
	.subscribe(() => {
		dispatch(playerActions.audioPlaying())
	});

Observable.fromEvent(_audio, 'timeupdate')
	.subscribe((event) => {
		dispatch(playerActions.audioTimeUpdated(getTime(event)))
	});

Observable.fromEvent(_audio, 'volumechange')
	.subscribe(() => {
		dispatch(playerActions.audioVolumeChanged(_audio.volume))
	});

Observable.fromEvent(window, 'keydown')
	.filter((e) => ~[32, 37, 38, 39, 40].indexOf(e.keyCode))
	.subscribe((e) => {
		switch (e.keyCode) {
			case 32:
				dispatch(playerActions.togglePlay());
				break;
			case 37:
				dispatch(playerActions.playNextSong());
				break;
			case 39:
				dispatch(playerActions.playPrevSong());
				break;
			case 38:
				dispatch(playerActions.setVolume(Math.min(1, _audio.volume + 0.05)));
				break;
			case 40:
				dispatch(playerActions.setVolume(Math.max(0, _audio.volume - 0.05)));
				break;
			default:
				break;
		}
	});


export const audio = {
	load(mid) {
		if(mid !== lastMid) {
			_audio.src = `${API_PLAY_URL}/${mid}.m4a?fromtag=46`;
			lastMid = mid;
		}
	},

	play() {
		_audio.play();
	},

	pause() {
		_audio.pause();
	},

	seek(time) {
		_audio.currentTime = time;
	},

	setVolume(volume) {
		_audio.volume = volume;
	},

	mute(bool) {
		_audio.muted = bool;
	}
};
