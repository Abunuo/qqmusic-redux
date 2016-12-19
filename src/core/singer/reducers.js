/**
 * Created by jiawei6 on 2016/12/6.
 */
import {Record, Map} from 'immutable';

import {singerActions} from './actions';

export const SingerState = new Record({
	song: new Map(),
	album: new Map(),
	mv: new Map(),
	data: new Map(),
	similar: new Map()
});

export function singerReducer(state = new SingerState(), action) {

	const {payload, type} = action;

	switch (type) {
		case singerActions.FETCH_SINGER_PENDING:
			return state.merge({
				[payload.type]: {
					lastFetchMid: payload.type === 'similar' ? payload.param.singer_mid : payload.param.singermid
				}
			});
		case singerActions.FETCH_SINGER_FAILED:
			return state.merge({
				[payload.type]: {
					lastFetchMid: null
				}
			});
		case singerActions.FETCH_SINGER_FULFILLED:
			if (payload.type === 'similar') {
				return state.merge({
					[payload.type]: {
						data: payload.result.singers,
						lastFetchMid: payload.param.singer_mid
					}
				});
			} else {
				return state.merge({
					[payload.type]: {
						data: payload.result.data,
						lastFetchMid: payload.param.singermid,
						begin: payload.param.begin
					}
				});
			}
		default:
			return state;
	}
}