/**
 * Created by jiawei6 on 2016/12/5.
 */
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {is} from 'immutable';

import {entityReplace, time2Min} from '../../core/utils';

import './PlayList.css'

const renderItem = (song, i, playSelectedSong, isPlaying, deleteSong) => {
	const {songname, singer, albumname, albummid, interval} = song;
	return (
		<li key={i}>
			<div  className={`playlist_item_${(i + 1) % 2 === 0 ? 'odd' : 'even'}`}>
				<div className='playlist_count'>
					{isPlaying ? <div className="playlist_count_playing"/> : i + 1}
				</div>
				<div className="playlist_songname" onClick={() => playSelectedSong(song)}>{entityReplace(songname)}</div>
				<div className="playlist_singer">
					{singer.map(({name, mid}, i) => [
						i !== 0 && ' / ',
						<Link to={`/singer/song/${mid}`}>{entityReplace(name)}</Link>
					])}
				</div>
				<div className="playlist_album">
					<Link to={`/album/song/${albummid}`}>{entityReplace(albumname)}</Link>
				</div>
				<div className="playlist_time">{time2Min(interval)}</div>
				<div className="playlist_delete">
					<div className="playlist_delete_icon" onClick={() => deleteSong(song)}/>
				</div>
			</div>
		</li>
	)
};

class PlayList extends Component {

	shouldComponentUpdate(nextProps) {
		const thisProps = this.props || {};

		for (const key in nextProps) {
			if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
				return true;
			}
		}

		return false;
	}

	render() {
		const {datas, playSelectedSong, currentSongId, isPlaying, deleteSong, addSongList} = this.props;
		return (
			<div className="playlist">
				<div className="playlist_header">
					{`总${datas.length}首`}
					<div className="playlist_delete_all" onClick={() => addSongList(null, true)}>
						<div className="playlist_delete_all_icon"/>
						清空
					</div>
				</div>
				<ul className="playlist_body">
					{
						datas.map(function (data, i) {
							return renderItem(data, i, playSelectedSong, isPlaying && data.songid === currentSongId, deleteSong);
						})
					}
				</ul>
			</div>
		)
	}
}

PlayList.propTypes = {
	datas: PropTypes.array.isRequired,
	playSelectedSong: PropTypes.func.isRequired,
	currentSongId: PropTypes.number,
	isPlaying: PropTypes.bool.isRequired,
	addSongList: PropTypes.func.isRequired,
};

export default PlayList;