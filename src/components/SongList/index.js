/**
 * Created by jiawei6 on 2016/12/5.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {entityReplace, lightKeyword, time2Min} from '../../core/utils';

import './SongList.css'

export const SongListItem = ({songData, i, keyword, playSelectedSong}) => {
	const {songname, singer, albumname, albummid, interval} = songData;
	return (
		<tr key={i}>
			<td className="songlist_songname" onClick={() => playSelectedSong(songData)}>{lightKeyword(entityReplace(songname), keyword)}</td>
			<td className="songlist_singer">
				{singer.map(({name, mid}, i) => [
					i !== 0 && ' / ',
					<Link to={`/singer/song/${mid}`}>{lightKeyword(entityReplace(name), keyword)}</Link>
				])}
			</td>
			<td className="songlist_album"><Link to={`/album/song/${albummid}`}>{lightKeyword(entityReplace(albumname), keyword)}</Link></td>
			<td className="songlist_time">{time2Min(interval)}</td>
		</tr>
	)
};

export const SongList = ({datas, keyword, playSelectedSong}) => (
	<table className="songlist">
		<thead>
		<tr>
			<td className="songlist_header_songname">歌曲</td>
			<td className="songlist_header_singer">歌手</td>
			<td className="songlist_header_album">专辑</td>
			<td className="songlist_header_time">时长</td>
		</tr>
		</thead>
		<tbody>
		{
			datas.map(function (song, i) {
				const {data, musicData} = song;
				const songData = data || musicData || song;
				return SongListItem({songData, i, keyword, playSelectedSong});
			})
		}
		</tbody>
	</table>
);

SongList.propTypes = {
	datas: PropTypes.array.isRequired,
	keyword: PropTypes.string,
	playSelectedSong: PropTypes.func
};

export default SongList;