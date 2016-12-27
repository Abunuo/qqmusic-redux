/**
 * Created by jiawei6 on 2016/12/8.
 */
export const playerActions = {

	AUDIO_ENDED: 'AUDIO_ENDED',
	AUDIO_PAUSED: 'AUDIO_PAUSED',
	AUDIO_PLAYING: 'AUDIO_PLAYING',
	AUDIO_TIME_UPDATED: 'AUDIO_TIME_UPDATED',
	AUDIO_VOLUME_CHANGED: 'AUDIO_VOLUME_CHANGED',

	LOAD_SONG: 'LOAD_SONG',
	PLAY_SONG: 'PLAY_SONG',
	PAUSE_SONG: 'PAUSE_SONG',
	PLAY_SELECTED_SONG: 'PLAY_SELECTED_SONG',
	PLAY_NEXT_SONG: 'PLAY_NEXT_SONG',
	PLAY_PREV_SONG: 'PLAY_PREV_SONG',
	SEEK_TIME: 'SEEK_TIME',
	SET_VOLUME: 'SET_VOLUME',
	MUTE: 'MUTE',
	SWITCH_PLAYMODE: 'SWITCH_PLAYMODE',
	SHOW_PLAYLIST: 'SHOW_PLAYLIST',
	DELETE_SONG: 'DELETE_SONG',
	ADD_SONGLIST: 'ADD_SONGLIST',

	FETCH_SONG_INFO_FAILED: 'FETCH_SONG_INFO_FAILED',
	FETCH_SONG_INFO_FULFILLED: 'FETCH_SONG_INFO_FULFILLED',
	FETCH_SONG_INFO_PENDING: 'FETCH_SONG_INFO_PENDING',

	INIT_PLAYER: 'INIT_PLAYER',

	fetchSongInfoFailed: result => ({
		type: playerActions.FETCH_SONG_INFO_FAILED,
		payload: {
			...result
		}
	}),

	fetchSongInfoFulfilled: result => ({
		type: playerActions.FETCH_SONG_INFO_FULFILLED,
		payload: {
			...result
		}
	}),

	fetchSongInfoPending: result => ({
		type: playerActions.FETCH_SONG_INFO_PENDING,
		payload: {
			...result
		}
	}),

	audioEnded: () => ({
		type: playerActions.AUDIO_ENDED
	}),

	audioPaused: () => ({
		type: playerActions.AUDIO_PAUSED
	}),

	audioPlaying: () => ({
		type: playerActions.AUDIO_PLAYING
	}),

	audioTimeUpdated: times => ({
		type: playerActions.AUDIO_TIME_UPDATED,
		payload: times
	}),

	audioVolumeChanged: volume => ({
		type: playerActions.AUDIO_VOLUME_CHANGED,
		payload: {
			volume
		}
	}),

	loadSong: (song) => {
		return {
			type: playerActions.LOAD_SONG,
			payload: {
				...song
			}
		}
	},

	playSong: () => ({
		type: playerActions.PLAY_SONG
	}),

	pauseSong: () => ({
		type: playerActions.PAUSE_SONG
	}),

	playSelectedSong: song => ({
		type: playerActions.PLAY_SELECTED_SONG,
		payload: {
			...song
		}
	}),

	playNextSong: () => ({
		type: playerActions.PLAY_NEXT_SONG
	}),

	playPrevSong: () => ({
		type: playerActions.PLAY_PREV_SONG
	}),

	addSongList: (songList, isReplace) => ({
		type: playerActions.ADD_SONGLIST,
		payload: {
			songList,
			isReplace
		}
	}),

	seekTime: time => ({
		type: playerActions.SEEK_TIME,
		payload: {
			time
		}
	}),

	setVolume: volume => ({
		type: playerActions.SET_VOLUME,
		payload: {
			volume
		}
	}),

	mute: muted => ({
		type: playerActions.MUTE,
		payload: {
			muted
		}
	}),

	switchPlayMode: () => ({
		type: playerActions.SWITCH_PLAYMODE
	}),

	showPlayList: bool => ({
		type: playerActions.SHOW_PLAYLIST,
		payload: {
			bool
		}
	}),

	deleteSong: song => ({
		type: playerActions.DELETE_SONG,
		payload: {
			...song
		}
	}),

	initPlayer: player => ({
		type: playerActions.INIT_PLAYER
	})
};

export const playerRequestActions = {
	failed: playerActions.fetchSongInfoFailed,
	fulfilled: playerActions.fetchSongInfoFulfilled,
	pending: playerActions.fetchSongInfoPending
};