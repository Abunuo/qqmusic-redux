/**
 * Created by jiawei6 on 2016/12/7.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Link} from 'react-router';
import {is} from 'immutable';

import {getAlbum} from '../../../core/album';

import './AlbumDataPage.css'

export class AlbumDataPage extends Component {

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.album, this.props.album);
	}

	render() {
		const {album} = this.props;
		if (album) {
			const {name, desc, singername, singermid, lan, genre, aDate, company} = album.toJS();
			return (
				<div className="album_data_wrap">
					<h3>专辑名：</h3>{name}<br/>
					<h3>歌手：</h3><Link to={`/singer/song/${singermid}`}>{singername}</Link><br/>
					<h3>流派：</h3>{genre}<br/>
					<h3>语言：</h3>{lan}<br/>
					<h3>发行时间：</h3>{aDate}<br/>
					<h3>唱片公司：</h3>{company}<br/>
					<h3>专辑简介：</h3>{desc}

				</div>
			);
		} else {
			return (
				<div>
					加载中...
				</div>
			);
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

export default connect(
	mapStateToProps,
	null
)(AlbumDataPage);