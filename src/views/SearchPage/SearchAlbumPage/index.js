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
		const {data, loadSearch, location: {query: {q}}} = this.props;

		if ((!data || data.get('keyword') !== q)) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, data} = this.props;
		const value = e.target.getAttribute('value');
		const curpage = data.get('album').get('curpage');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_ALBUM_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.data, this.props.data);
	}

	render() {
		const {data} = this.props;
		if (data) {
			const {album: {curpage, list, totalnum}, keyword} = data.toJS();
			const totalpage = Math.ceil(totalnum / LOAD_SEARCH_ALBUM_CONFIG.n);

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
			data: album
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