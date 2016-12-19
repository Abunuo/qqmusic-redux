/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import SongList from '../../../components/SongList';
import {playerActions} from '../../../core/player';
import {getAlbum} from '../../../core/album';

import './AlbumSongPage.css';

export class AlbumSongPage extends Component {

	render() {
		const {album} = this.props;

		if (album) {
			return (
				<div className="album_songlist_wrap">
					<SongList datas={album.list} playSelectedSong={this.props.playSelectedSong}/>
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
	getAlbum,
	(album) => {
		return {
			album
		}
	}
);

const mapDispatchToProps = {
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AlbumSongPage);