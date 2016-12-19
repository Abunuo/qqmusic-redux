/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {searchActions, getSearchSong, getSearch} from '../../../core/search';
import {playerActions} from '../../../core/player';
import SongList from '../../../components/SongList';
import PageNav from '../../../components/PageNav';
import {LOAD_SEARCH_SONG_CONFIG} from '../../../core/constants';

import './SearchSongPage.css';

export class SearchSongPage extends Component {

	componentWillMount() {
		const {search: {pending, song}, loadSearch, location: {query: {q}}} = this.props;

		if (!pending && (!song || song.keyword !== q)) {
			loadSearch({
				...LOAD_SEARCH_SONG_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, song: {song: {curpage}}} = this.props;
		const value = e.target.getAttribute('value');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_SONG_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	render() {
		if (this.props.song) {
			const {song, keyword, semantic} = this.props.song;
			const {curpage, list, totalnum} = song.curnum ? song : semantic;
			const totalpage = Math.ceil(totalnum / 20);

			return (
				<div className="search_songlist_wrap">
					<SongList datas={list} keyword={keyword.trim()} playSelectedSong={this.props.playSelectedSong}/>
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
	getSearch,
	(song, search) => ({
		song: song && song.toJS(),
		search: search.toJS()
	})
);

const mapDispatchToProps = {
	loadSearch: searchActions.loadSearch,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchSongPage);