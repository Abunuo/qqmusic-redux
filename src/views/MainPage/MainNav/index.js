/**
 * Created by jiawei6 on 2016/11/23.
 */
import React from 'react';
import {Link} from 'react-router';

import './MainNav.css';

export const MainNav = () => (
	<div className="main_nav">
		<h3 className="main_nav_tit">推荐</h3>
		<ul className="main_nav_list">
			<li><Link to="/" activeClassName="active">发现音乐</Link></li>
			<li><Link to="/mvlist" activeClassName="active">MV</Link></li>
		</ul>
	</div>
);

export default MainNav;