/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {singerActions, getSingerSongData, getSingerSongLastMid, getSingerSongBegin} from '../../../core/singer';
import {playerActions} from '../../../core/player';
import SongList from '../../../components/SongList';
import PageNav from '../../../components/PageNav';
import {API_SINGER_SONG_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerSongPage.css';

export class SingerSongPage extends Component {

	componentWillMount() {
		const {loadSingerSong, lastFetchMid} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!lastFetchMid || lastFetchMid !== mid) {
			loadSingerSong({
				singermid: mid,
				begin: 0
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerSong} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerSong({
				singermid: mid,
				begin: 0
			})
		}
	}

	handleNavClick(e) {
		const {loadSingerSong, begin} = this.props;
		const mid = getPathLastFromProps(this.props);
		const value = e.target.getAttribute('value');
		const {num} = API_SINGER_SONG_CONFIG;

		if (value) {
			loadSingerSong({
				begin: value === 'next' ? begin + num : value === 'prev' ? begin - num : (value - 1) * num,
				singermid: mid
			});
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.data, this.props.data);
	}

	render() {
		const {data, begin} = this.props;
		if (data) {
			const {list, total} = data.toJS();
			const {num} = API_SINGER_SONG_CONFIG;
			const totalpage = Math.ceil(total / num);
			const curpage = Math.floor(begin / num) + 1;

			return (
				<div className="singer_songlist_wrap">
					<SongList datas={list} playSelectedSong={this.props.playSelectedSong}/>
					<PageNav curpage={curpage} totalpage={totalpage} handleNavClick={this.handleNavClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				<div>加载中...</div>
			);
		}
	}
}

const mapStateToProps = createSelector(
	getSingerSongData,
	getSingerSongLastMid,
	getSingerSongBegin,
	(data, lastFetchMid, begin) => {
		return {
			data,
			lastFetchMid,
			begin
		}
	}
);

const mapDispatchToProps = {
	loadSingerSong: singerActions.loadSingerSong,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerSongPage);