/**
 * Created by jiawei6 on 2016/11/23.
 */
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import './SearchNav.css';

export const SearchNav = ({query}) => (
	<div className="search_nav">
		<ul>
			<li><IndexLink to={`/search/song?q=${query.q}`} activeClassName="active">单曲</IndexLink></li>
			<li><Link to={`/search/album?q=${query.q}`} activeClassName="active">专辑</Link></li>
			<li><Link to={`/search/mv?q=${query.q}`} activeClassName="active">MV</Link></li>
		</ul>
	</div>
);

SearchNav.propTypes = {
	query: PropTypes.object.isRequired
};

export default SearchNav;