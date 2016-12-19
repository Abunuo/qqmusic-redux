/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import AlbumList from '../../../components/AlbumList';
import {searchActions, getSearch} from '../../../core/search';
import PageNav from '../../../components/PageNav';
import {LOAD_SEARCH_ALBUM_CONFIG} from '../../../core/constants';

import './SearchAlbumPage.css';

export class SearchAlbumPage extends Component {

	componentWillMount() {
		const {search: {pending, album}, loadSearch, location: {query: {q}}} = this.props;

		if (!pending && (!album || album.keyword !== q)) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, album: {album: {curpage}}} = this.props;
		const value = e.target.getAttribute('value');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	render() {
		if (this.props.album) {
			const {album: {curpage, list, totalnum}, keyword} = this.props.album;
			const totalpage = Math.ceil(totalnum / 20);

			return (
				<div className="search_albumlist_wrap">
					<AlbumList datas={list} keyword={keyword.trim()}/>
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
	getSearch,
	(search) => {
		const {album} = search
		return {
			album: album && album.toJS(),
			search: search.toJS()
		}
	}
);

const mapDispatchToProps = {
	loadSearch: searchActions.loadSearch
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchAlbumPage);