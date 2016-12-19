/**
 * Created by jiawei6 on 2016/11/23.
 */
import React from 'react';
import {Link, IndexLink} from 'react-router';

import './ExploreNav.css';

export const ExploreNav = () => (
	<div className="explore_nav">
		<ul>
			<li><IndexLink to="/" activeClassName="active">排行榜</IndexLink></li>
			<li><Link to="/singerlist" activeClassName="active">歌手</Link></li>
			<li><Link to="/albumlist" activeClassName="active">专辑</Link></li>
		</ul>
	</div>
);

export default ExploreNav;