/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {is} from 'immutable';

import SearchBar from '../../../components/SearchBar';

import './AppHeader.css';

class AppHeader extends Component {

	shouldComponentUpdate(nextProps) {
		return !is(this.props.search, nextProps.search);
	}

	render() {
		const {search} = this.props;
		return (
			<header className="app_header_wrap">
				<div className="app_header">

					<Link to="/" className="qqmusic_title">
						<img src="//y.gtimg.cn/mediastyle/yqq/img/logo.png" alt="QQ音乐" className="qqmusic_logo"/>
					</Link>


					<div className="search_bar_wrap">
						<SearchBar
							search={search}
						/>
					</div>
				</div>
			</header>
		)
	}
}

AppHeader.propTypes = {
	search: PropTypes.object.isRequired
};

export default AppHeader;