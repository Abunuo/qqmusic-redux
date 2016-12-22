/**
 * Created by jiawei6 on 2016/12/22.
 */
export const localStoreActions = {
	SAVE_TO_LOCAL: 'SAVE_TO_LOCAL',
	LOAD_PLAYLIST: 'LOAD_PLAYLIST',

	saveToLocal: (key, value) => ({
		type: localStoreActions.SAVE_TO_LOCAL,
		payload: {
			key,
			value
		}
	}),

	loadPlayList: () => ({
		type: localStoreActions.LOAD_PLAYLIST,
	})
};