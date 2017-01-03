/**
 * Created by jiawei6 on 2016/12/22.
 */
export const localStoreActions = {
	SAVE_TO_LOCAL: 'SAVE_TO_LOCAL',

	saveToLocal: (key, value) => ({
		type: localStoreActions.SAVE_TO_LOCAL,
		payload: {
			key,
			value
		}
	})
};