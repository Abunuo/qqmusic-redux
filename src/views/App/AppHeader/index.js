/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

import SearchBar from '../../../components/SearchBar';

import './AppHeader.css';

class AppHeader extends Component {

/*	shouldComponentUpdate(nextProps) {
		const {props: thisProps} = this;

		return nextProps.showSuggestBox !== thisProps.showSuggestBox;
	}*/

	render() {
		const {search} = this.props;
		return (
			<header className="app_header_wrap">
				<div className="app_header">

					<Link to="/" className="qqmusic_title">
						<img src="//y.gtimg.cn/mediastyle/yqq/img/logo.png" alt="QQ音乐" className="qqmusic_logo"/>
					</Link>


					<SearchBar
						search={search}
					/>
				</div>
			</header>
		)
	}
}

AppHeader.propTypes = {
	search: PropTypes.object.isRequired
};

export default AppHeader;