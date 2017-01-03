/**
 * Created by jiawei6 on 2016/12/22.
 */
import {localStoreActions} from './actions';

export function saveToLocal(action$) {
	return action$.ofType(localStoreActions.SAVE_TO_LOCAL)
		.do(({payload: {key, value}}) => {
			localStorage.setItem(key, JSON.stringify(value));
		})
		.skip();
}

export const localStoreEpics = [
	saveToLocal
];