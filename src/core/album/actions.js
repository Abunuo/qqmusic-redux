/**
 * Created by jiawei6 on 2016/12/7.
 */
export const albumActions = {
	FETCH_ALBUM_FAILED: 'FETCH_ALBUM_FAILED',
	FETCH_ALBUM_FULFILLED: 'FETCH_ALBUM_FULFILLED',
	FETCH_ALBUM_PENDING: 'FETCH_ALBUM_PENDING',

	LOAD_ALBUM: 'LOAD_ALBUM',

	fetchAlbumFailed: result => ({
		type: albumActions.FETCH_ALBUM_FAILED,
		payload: {
			...result
		}
	}),

	fetchAlbumFulfilled: result => ({
		type: albumActions.FETCH_ALBUM_FULFILLED,
		payload: {
			...result
		}
	}),

	fetchAlbumPending: result => ({
		type: albumActions.FETCH_ALBUM_PENDING,
		payload: {
			...result
		}
	}),

	loadAlbum: (params) => ({
		type: albumActions.LOAD_ALBUM,
		payload: {
			...params
		}
	})
};

export const albumRequestActions = {
	failed: albumActions.fetchAlbumFailed,
	fulfilled: albumActions.fetchAlbumFulfilled,
	pending: albumActions.fetchAlbumPending
};