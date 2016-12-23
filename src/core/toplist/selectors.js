/**
 * Created by jiawei6 on 2016/12/13.
 */
import {createSelector} from 'reselect';
import {getPathLastFromProps} from '../../core/utils';

/*eslint-disable */
const findFromLists = (lists, topid, date) => lists.find((list) => (topid == list.get('topid') && date === list.get('date')));
/*eslint-enable */

export function getToplist(state) {
	return state.toplist;
}

export function getToplistAll(state) {
	return getToplist(state).all;
}

export function getToplistLists(state) {
	return getToplist(state).lists;
}

export function getIdAndDate(state, props) {
	return {
		topid: getPathLastFromProps(props),
		date: props.location.query.date
	};
}

export const getCurToplist = createSelector(
	getToplistLists,
	getIdAndDate,
	(lists, {topid, date}) => findFromLists(lists, topid, date)
);

/*
export function getCurToplist(state, props) {
	const lists = getToplistLists(state);
	const {location: {query: {date}}} = props;
	const topid = getPathLastFromProps(props);

	return findFromLists(lists, topid, date);
}
*/
