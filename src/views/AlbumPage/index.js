/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {Component} from 'react';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {is} from 'immutable';

import AlbumSongPage from './AlbumSongPage';
import AlbumPageNav from './AlbumPageNav';
import {getAlbum, albumActions} from '../../core/album';
import {getPathLastFromProps} from '../../core/utils';
import {ALBUM_PHOTO_300_URL} from '../../core/constants';

import './AlbumPage.css';

export class AlbumPage extends Component {

	componentWillMount() {
		const mid = getPathLastFromProps(this.props);
		const {album, loadAlbum} = this.props;

		if (!album || album.mid !== mid) {
			loadAlbum({
				albummid: mid
			});
		}
	}

	shouldComponentUpdate(nextProps) {
		const {album, location: {pathname}} = this.props;
		const {nextAlbum, location: {pathname: nextPathname}} = nextProps;
		return !is(album, nextAlbum) || pathname !== nextPathname;
	}

	render() {
		const {children, album} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (album) {
			const {name, genre, singername, singermid} = album.toJS();
			return (
				<div>
					<div className="album_page_header">
						<span className="album_cover">
							<img alt={name} className="album_photo" src={`${ALBUM_PHOTO_300_URL}${mid}.jpg`}/>
						</span>
						<div className="album_box">
							<span className="album_name_txt">{name}</span>
							<span className="album_info_txt">歌手：<Link to={`/singer/song/${singermid}`}>{singername}</Link></span>
							<span className="album_info_txt">流派：{genre}</span>
						</div>
					</div>
					<AlbumPageNav mid={mid}/>
					{children || <AlbumSongPage/>}
				</div>
			)
		} else {
			return (
				<div>
					加载中...
					<AlbumPageNav mid={mid}/>
					{children || <AlbumSongPage/>}
				</div>
			)
		}
	}
}

const mapStateToProps = createSelector(
	getAlbum,
	(album) => {
		return {
			album
		}
	}
);

const mapDispatchToProps = {
	loadAlbum: albumActions.loadAlbum
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumPage);