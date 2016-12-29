/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {searchActions, getSearchSong} from '../../../core/search';
import {playerActions} from '../../../core/player';
import SongList from '../../../components/SongList';
import PageNav from '../../../components/PageNav';
import {LOAD_SEARCH_SONG_CONFIG} from '../../../core/constants';

import './SearchSongPage.css';

export class SearchSongPage extends Component {

	componentWillMount() {
		const {song, loadSearch, location: {query: {q}}} = this.props;

		if (!song || song.keyword !== q) {
			loadSearch({
				...LOAD_SEARCH_SONG_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, song} = this.props;
		const value = e.target.getAttribute('value');
		const curpage = song.get('song').get('curpage');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_SONG_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.song, this.props.song);
	}

	render() {
		const {song: propsSong, playSelectedSong} = this.props;
		if (propsSong) {
			const {song, keyword, semantic} = propsSong.toJS();
			const {curpage, list, totalnum} = song.curnum ? song : semantic;
			const totalpage = Math.ceil(totalnum / 20);

			return (
				<div className="search_songlist_wrap">
					<SongList datas={list} keyword={keyword.trim()} playSelectedSong={playSelectedSong}/>
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
	getSearchSong,
	(song) => {
		return {
			song
		}
	}
);

const mapDispatchToProps = {
	loadSearch: searchActions.loadSearch,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchSongPage);