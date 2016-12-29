/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import AlbumList from '../../../components/AlbumList';
import {searchActions, getSearchAlbum} from '../../../core/search';
import PageNav from '../../../components/PageNav';
import {LOAD_SEARCH_ALBUM_CONFIG} from '../../../core/constants';

import './SearchAlbumPage.css';

export class SearchAlbumPage extends Component {

	componentWillMount() {
		const {album, loadSearch, location: {query: {q}}} = this.props;

		if ((!album || album.get('keyword') !== q)) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, album} = this.props;
		const value = e.target.getAttribute('value');
		const curpage = album.get('album').get('curpage');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.album, this.props.album);
	}

	render() {
		const {album} = this.props;
		if (album) {
			const {album: {curpage, list, totalnum}, keyword} = album.toJS();
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
	getSearchAlbum,
	(album) => {
		return {
			album
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