/**
 * Created by jiawei6 on 2016/12/7.
 */
import {albumActions} from './actions';

export function albumReducer(state = null, action) {

	const {payload} = action;

	switch (action.type) {
		case albumActions.FETCH_ALBUM_PENDING:
		case albumActions.FETCH_ALBUM_FAILED:
			return state;
		case albumActions.FETCH_ALBUM_FULFILLED:
			return {
				...payload.result.data
			};
		default:
			return state;
	}
}