/**
 * Created by jiawei6 on 2016/12/6.
 */
export const singerActions = {
	FETCH_SINGER_FAILED: 'FETCH_SINGER_FAILED',
	FETCH_SINGER_FULFILLED: 'FETCH_SINGER_FULFILLED',
	FETCH_SINGER_PENDING: 'FETCH_SINGER_PENDING',

	LOAD_SINGER_SONG: 'LOAD_SINGER_SONG',
	LOAD_SINGER_DATA: 'LOAD_SINGER_DATA',
	LOAD_SINGER_ALBUM: 'LOAD_SINGER_ALBUM',
	LOAD_SINGER_SIMILAR: 'LOAD_SINGER_SIMILAR',

	fetchSingerFailed: result => ({
		type: singerActions.FETCH_SINGER_FAILED,
		payload: {
			...result
		}
	}),

	fetchSingerFulfilled: result => ({
		type: singerActions.FETCH_SINGER_FULFILLED,
		payload: {
			...result
		}
	}),

	fetchSingerPending: result => ({
		type: singerActions.FETCH_SINGER_PENDING,
		payload: {
			...result
		}
	}),

	loadSingerSong: (params) => ({
		type: singerActions.LOAD_SINGER_SONG,
		payload: {
			...params
		}
	}),

	loadSingerData: (params) => ({
		type: singerActions.LOAD_SINGER_DATA,
		payload: {
			...params
		}
	}),

	loadSingerAlbum: (params) => ({
		type: singerActions.LOAD_SINGER_ALBUM,
		payload: {
			...params
		}
	}),

	loadSingerSimilar: (params) => ({
		type: singerActions.LOAD_SINGER_SIMILAR,
		payload: {
			...params
		}
	})
};

export const singerRequestActions = {
	failed: singerActions.fetchSingerFailed,
	fulfilled: singerActions.fetchSingerFulfilled,
	pending: singerActions.fetchSingerPending
};