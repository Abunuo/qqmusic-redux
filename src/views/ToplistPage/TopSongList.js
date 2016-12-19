/**
 * Created by jiawei6 on 2016/12/14.
 */
import React from 'react';
import {Link} from 'react-router';
import LazyLoad from 'react-lazyload';

import {entityReplace, time2Min} from '../../core/utils';
import {ALBUM_PHOTO_90_URL} from '../../core/constants';

import './TopSongList.css';

function renderRank(type, topid, curCount, oldCount, inCount) {
	switch (type) {
		case 'top':
			if (topid !== '4') {
				if (oldCount === 0) {
					return (
						<td className="top_songlist_rank">
							<i className="icon_rank_new"></i>
						</td>
					)
				} else if (curCount < oldCount) {
					return (
						<td className="top_songlist_rank">
							<i className="icon_rank_up"></i>
							{oldCount - curCount}
						</td>
					)
				} else if (curCount === oldCount) {
					return (
						<td className="top_songlist_rank">
							<i className="icon_rank_keep"></i>
						</td>
					)
				} else {
					return (
						<td className="top_songlist_rank">
							<i className="icon_rank_down"></i>
							{curCount - oldCount}
						</td>
					)
				}
			} else {
				return (
					<td className="top_songlist_rank">
						<i className="icon_rank_popular"></i>
						{(inCount * 100).toFixed(0) + '%'}
					</td>
				)
			}
		case 'global':
		default:
			return (<td></td>);
	}
}

function renderItem(song, i, begin, type, topid, playSelectedSong) {
	const {data, cur_count, old_count, in_count} = song;
	const {albummid, albumname, songname, singer, interval} = data;
	const rank = begin + i + 1;
	return (
		<tr key={i}>
			<td className={`top_songlist_count ${rank < 4 ? 'top_songlist_count_top' : ''}`}>{rank}</td>
			{renderRank(type, topid, +cur_count, +old_count, +in_count)}
			<td className="top_songlist_song">
				<Link  to={`/album/song/${albummid}`}>
					<LazyLoad overflow={true} offset={200} once={true} placeholder={<div className="top_songlist_song_photo"></div>}>
						<img alt={albumname} src={`${ALBUM_PHOTO_90_URL}${albummid}.jpg`} className="top_songlist_song_photo"/>
					</LazyLoad>
				</Link>
				<span className="top_songlist_songname" onClick={() => playSelectedSong(data)}>{entityReplace(songname)}</span>
			</td>
			<td className="top_songlist_singer">
				{singer.map(({name, mid}, i) => [
					i !== 0 && ' / ',
					<Link to={`/singer/song/${mid}`}>{entityReplace(name)}</Link>
				])}
			</td>
			<td className="top_songlist_time">{time2Min(interval)}</td>
		</tr>
	)
}

export default function SongList({datas, topid, type, playSelectedSong}) {
	return (
		<table className="top_songlist">
			<thead>
			<tr>
				<td className="top_songlist_header_count"></td>
				<td className="top_songlist_header_rank"></td>
				<td className="top_songlist_header_song">歌曲</td>
				<td className="top_songlist_header_singer">歌手</td>
				<td className="top_songlist_header_time">时长</td>
			</tr>
			</thead>
			<tbody>
			{
				datas.songlist.map(function (data, i) {
					return renderItem(data, i, datas.song_begin, type, topid, playSelectedSong);
				})
			}
			</tbody>
		</table>
	)
}