/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {singerActions, getSinger} from '../../../core/singer';
import {playerActions} from '../../../core/player';
import SongList from '../../../components/SongList';
import PageNav from '../../../components/PageNav';
import {API_SINGER_SONG_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerSongPage.css';

export class SingerSongPage extends Component {

	componentWillMount() {
		const {loadSingerSong, song} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!song.lastFetchMid || song.lastFetchMid !== mid) {
			loadSingerSong({
				singermid: mid
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerSong} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerSong({
				singermid: mid
			})
		}
	}

	handleNavClick(e) {
		const {loadSingerSong, song: {begin}} = this.props;
		const mid = getPathLastFromProps(this.props);
		const value = e.target.getAttribute('value');
		const {num} = API_SINGER_SONG_CONFIG;

		if (value) {
			loadSingerSong({
				begin: value === 'next' ? begin + num : value === 'prev' ? begin - num : (value - 1) * num,
				singermid: mid
			})
		}
	}

	render() {
		if (this.props.song.data) {
			const {begin, data: {list, total}} = this.props.song;
			const {num} = API_SINGER_SONG_CONFIG;
			const totalpage = Math.ceil(total / num);
			const curpage = Math.floor(begin / num) + 1;

			return (
				<div className="singer_songlist_wrap">
					<SongList datas={list} playSelectedSong={this.props.playSelectedSong}/>
					<PageNav curpage={curpage} totalpage={totalpage} handleNavClick={this.handleNavClick.bind(this)}/>
				</div>
			)
		} else {
			return (
				<div>加载中...</div>
			);
		}
	}
}

const mapStateToProps = createSelector(
	getSinger,
	(singer) => {
		return {
			song: singer.song.toJS()
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