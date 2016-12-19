/**
 * Created by jiawei6 on 2016/12/13.
 */
export const toplistActions = {
	FETCH_TOPLIST_FAILED: 'FETCH_TOPLIST_FAILED',
	FETCH_TOPLIST_FULFILLED: 'FETCH_TOPLIST_FULFILLED',
	FETCH_TOPLIST_PENDING: 'FETCH_TOPLIST_PENDING',

	LOAD_TOPLIST_ALL: 'LOAD_TOPLIST_ALL',
	LOAD_TOPLIST_ONE: 'LOAD_TOPLIST_ONE',

	fetchToplistFailed: result => ({
		type: toplistActions.FETCH_TOPLIST_FAILED,
		payload: {
			...result
		}
	}),

	fetchToplistFulfilled: result => ({
		type: toplistActions.FETCH_TOPLIST_FULFILLED,
		payload: {
			...result
		}
	}),

	fetchToplistPending: result => ({
		type: toplistActions.FETCH_TOPLIST_PENDING,
		payload: {
			...result
		}
	}),

	loadToplistAll: () => ({
		type: toplistActions.LOAD_TOPLIST_ALL
	}),

	loadToplistOne: param => ({
		type: toplistActions.LOAD_TOPLIST_ONE,
		payload: {
			...param
		}
	})
};

export const toplistRequestActions = {
	failed: toplistActions.fetchToplistFailed,
	fulfilled: toplistActions.fetchToplistFulfilled,
	pending: toplistActions.fetchToplistPending
};