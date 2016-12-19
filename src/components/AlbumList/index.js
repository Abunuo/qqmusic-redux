/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {entityReplace, lightKeyword} from '../../core/utils';
import {ALBUM_PHOTO_90_URL} from '../../core/constants';

import './AlbumList.css';

const renderItem = ({singerName, singerMID, albumName, albumMID, publicTime, pubTime, singers}, i, keyword) => (
	<tr key={i}>
		<td className="albumlist_albumname">
			<Link to={`/album/song/${albumMID}`}>
				<img alt={albumName} className="albumlist_pic" src={`${ALBUM_PHOTO_90_URL}${albumMID}.jpg`}/>
				{lightKeyword(entityReplace(albumName), keyword)}
			</Link>
		</td>
		<td className="albumlist_singer">
			{singers
				?
				singers.map(({singer_name, singer_mid}, i) => [
					i !== 0 && ' / ',
					<Link to={`/singer/song/${singer_mid}`}>{lightKeyword(entityReplace(singer_name), keyword)}</Link>
				])
				:
				<Link to={`/singer/song/${singerMID}`}>{lightKeyword(entityReplace(singerName), keyword)}</Link>
			}
		</td>
		<td className="albumlist_publictime">{publicTime || pubTime}</td>
	</tr>
);

export const AlbumList = ({datas, keyword}) => (
	<table className="albumlist">
		<thead>
		<tr>
			<td className="albumlist_header_albumname">专辑</td>
			<td className="albumlist_header_singer">歌手</td>
			<td className="albumlist_header_publictime">发行时间</td>
		</tr>
		</thead>
		<tbody>
		{
			datas.map(function (data, i) {
				return renderItem(data, i, keyword);
			})
		}
		</tbody>
	</table>
);

AlbumList.propTypes = {
	datas: PropTypes.array.isRequired,
	keyword: PropTypes.string
};

export default AlbumList