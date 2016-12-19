/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import './SingerPageNav.css';

export const SingerPageNav = ({mid}) => (
	<div className="singer_page_nav">
		<ul>
			<li><IndexLink to={`/singer/song/${mid}`} activeClassName="active">歌曲</IndexLink></li>
			<li><Link to={`/singer/album/${mid}`} activeClassName="active">专辑</Link></li>
			<li><Link to={`/singer/mv/${mid}`} activeClassName="active">MV</Link></li>
			<li><Link to={`/singer/similar/${mid}`} activeClassName="active">相似歌手</Link></li>
		</ul>
	</div>
);

SingerPageNav.propTypes = {
	mid: PropTypes.string.isRequired
};

export default SingerPageNav;