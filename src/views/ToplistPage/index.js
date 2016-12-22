/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {toplistActions, getToplist} from '../../core/toplist';
import {playerActions} from '../../core/player';
import {getPathLastFromProps} from '../../core/utils';
import TopSongList from './TopSongList';

import './ToplistPage.css'

/*eslint-disable */
const findFromLists = (lists, topid, date) => lists.find((list) => (topid == list.topid && date === list.date));
const findFromAll = (all, topid) => all.List.find(lists => topid == lists.topID);
/*eslint-enable */

class ToplistPage extends Component {

	componentWillMount() {
		const {lists, loadToplistOne, location: {query: {date, type}}} = this.props;
		const topid = getPathLastFromProps(this.props);

		if (!findFromLists(lists, topid, date)) {
			loadToplistOne({
				topid,
				date,
				type
			})
		}
	}

	render() {
		const {lists, all, location: {query: {date, type}}} = this.props;
		const topid = getPathLastFromProps(this.props);
		const finded = findFromLists(lists, topid, date);

		if (finded) {
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
						<TopSongList datas={finded} type={type} topid={topid} playSelectedSong={this.props.playSelectedSong}/>
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
	getToplist,
	({lists, all}) => ({
		lists,
		all
	})
);

const mapDispatchToProps = {
	loadToplistOne: toplistActions.loadToplistOne,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToplistPage);