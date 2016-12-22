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
import {API_SINGER_ALBUM_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerAlbumPage.css';

export class SingerAlbumPage extends Component {

	componentWillMount() {
		const {loadSingerAlbum, album} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!album.lastFetchMid || album.lastFetchMid !== mid) {
			loadSingerAlbum({
				singermid: mid
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerAlbum} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerAlbum({
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
				begin: (value - 1) * API_SINGER_ALBUM_CONFIG.num,
				singermid: mid
			})
		}
	}

	render() {
		if (this.props.album.data) {
			const {begin, data: {list, total}} = this.props.album;
			const {num} = API_SINGER_ALBUM_CONFIG;
			const totalpage = Math.ceil(total / num);
			const curpage = Math.floor(begin / num) + 1;

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