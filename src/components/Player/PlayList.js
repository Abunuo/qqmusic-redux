/**
 * Created by jiawei6 on 2016/12/5.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {List} from 'immutable';

import {entityReplace, time2Min} from '../../core/utils';

import './PlayList.css'

const renderItem = (song, i, playSelectedSong, isPlaying, deleteSong) => {
	const {songname, singer, albumname, albummid, interval} = song;
	return (
		<tr key={i} className={`playlist_item_${(i + 1) % 2 === 0 ? 'odd' : 'even'}`}>
			<td><div className={`playlist_count${isPlaying ? ' playlist_count_playing' : ''}`}>{i + 1}</div></td>
			<td>
				<div className="playlist_songname" onClick={() => playSelectedSong(song)}>{entityReplace(songname)}</div>
			</td>
			<td>
				<div className="playlist_singer">
					{singer.map(({name, mid}, i) => [
						i !== 0 && ' / ',
						<Link to={`/singer/song/${mid}`}>{entityReplace(name)}</Link>
					])}
				</div>
			</td>
			<td>
				<div className="playlist_album">
					<Link to={`/album/song/${albummid}`}>{entityReplace(albumname)}</Link>
				</div>
			</td>
			<td className="playlist_time">{time2Min(interval)}</td>
			<td className="playlist_delete">
				<div className="playlist_delete_icon" onClick={() => deleteSong(song)}/>
			</td>
		</tr>
	)
};

export const PlayList = ({datas, playSelectedSong, currentSong, isPlaying, deleteSong}) => {
	return (
		<table className="playlist">
			<thead>
			<tr>
				<td className="playlist_header_count"></td>
				<td className="playlist_header_songname">歌曲</td>
				<td className="playlist_header_singer">歌手</td>
				<td className="playlist_header_album">专辑</td>
				<td className="playlist_header_time">时长</td>
				<td className="playlist_header_delete"></td>
			</tr>
			</thead>
			<tbody>
			{
				datas.map(function (data, i) {
					return renderItem(data, i, playSelectedSong, isPlaying && currentSong && data.songid === currentSong.songid, deleteSong);
				})
			}
			</tbody>
		</table>
	)
};

PlayList.propTypes = {
	datas: PropTypes.instanceOf(List).isRequired,
	playSelectedSong: PropTypes.func.isRequired,
	currentSong: PropTypes.object,
	isPlaying: PropTypes.bool
};

export default PlayList;