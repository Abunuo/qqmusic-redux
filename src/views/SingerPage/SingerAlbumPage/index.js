/**
 * Created by jiawei6 on 2016/12/6.
 */
/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {singerActions, getSinger} from '../../../core/singer';
import AlbumList from '../../../components/AlbumList';
import PageNav from '../../../components/PageNav';
import {LOAD_SINGER_ALBUM_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerAlbumPage.css';

export class SingerAlbumPage extends Component {

	componentWillMount() {
		const {loadSingerAlbum, album} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!album.lastFetchMid || album.lastFetchMid !== mid) {
			loadSingerAlbum({
				...LOAD_SINGER_ALBUM_CONFIG,
				singermid: mid
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerAlbum} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerAlbum({
				...LOAD_SINGER_ALBUM_CONFIG,
				singermid: mid
			})
		}
	}

	handleNavClick(e) {
		const {loadSingerAlbum} = this.props;
		const mid = getPathLastFromProps(this.props);
		const value = e.target.getAttribute('value');

		if (value) {
			loadSingerAlbum({
				...LOAD_SINGER_ALBUM_CONFIG,
				begin: (value - 1) * LOAD_SINGER_ALBUM_CONFIG.num,
				singermid: mid
			})
		}
	}

	render() {
		if (this.props.album.data) {
			const {begin, data: {list, total}} = this.props.album;
			const totalpage = Math.ceil(total / LOAD_SINGER_ALBUM_CONFIG.num);
			const curpage = Math.floor(begin / LOAD_SINGER_ALBUM_CONFIG.num) + 1;

			return (
				<div className="singer_albumlist_wrap">
					<AlbumList datas={list}/>
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
			album: singer.album.toJS()
		}
	}
);

const mapDispatchToProps = {
	loadSingerAlbum: singerActions.loadSingerAlbum
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerAlbumPage);