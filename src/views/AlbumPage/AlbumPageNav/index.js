/**
 * Created by jiawei6 on 2016/12/7.
 */
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import './AlbumPageNav.css';

export const AlbumPageNav = ({mid}) => (
	<div className="album_page_nav">
		<ul>
			<li><IndexLink to={`/album/song/${mid}`} activeClassName="active">歌曲</IndexLink></li>
			<li><Link to={`/album/data/${mid}`} activeClassName="active">专辑信息</Link></li>
		</ul>
	</div>
);

AlbumPageNav.propTypes = {
	mid: PropTypes.string.isRequired
};

export default AlbumPageNav;