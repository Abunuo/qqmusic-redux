/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {toplistActions, getCurToplist, getToplistAll} from '../../core/toplist';
import {playerActions} from '../../core/player';
import {getPathLastFromProps} from '../../core/utils';
import TopSongList from './TopSongList';

import './ToplistPage.css'

/*eslint-disable */
const findFromAll = (all, topid) => all.List.find(lists => topid == lists.topID);
/*eslint-enable */

class ToplistPage extends Component {

	componentWillMount() {
		const {list, loadToplistOne, location: {query: {date, type}}} = this.props;
		const topid = getPathLastFromProps(this.props);

		if (!list) {
			loadToplistOne({
				topid,
				date,
				type
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.list, this.props.list);
	}

	render() {
		const {list, all, location: {query: {type}}, playSelectedSong} = this.props;
		const topid = getPathLastFromProps(this.props);

		if (list) {
			let info = {};
			all.forEach((item) => {
				info = findFromAll(item, topid);
				return !info;
			});

			const {headPic_v12, ListName} = info;

			return (
				<div className="toplist_page_wrap">
					<img src={headPic_v12} alt={ListName} className="toplist_page_header"/>
					<div className="top_songlist_wrap">
						<TopSongList datas={list.toJS()} type={type} topid={topid} playSelectedSong={playSelectedSong}/>
					</div>
				</div>
			)
		} else {
			return (
				<div>
					加载中...
				</div>
			)
		}
	}
}

const mapStateToProps = createSelector(
	getCurToplist,
	getToplistAll,
	(list, all) => {
		return {
			list,
			all
		}
	}
);

const mapDispatchToProps = {
	loadToplistOne: toplistActions.loadToplistOne,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToplistPage);