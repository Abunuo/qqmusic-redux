/**
 * Created by jiawei6 on 2016/11/23.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import ExploreNav from './ExploreNav';

import {nagivateActions} from '../../core/navigate';

import './ExplorePage.css';

export class ExplorePage extends Component {

	render() {
		const {children} = this.props;
		return (
			<div className="explore_page">
				<ExploreNav/>
				{children}
			</div>
		)
	}
}

const mapDispatchToProps = {
	navigateTo: nagivateActions.navigateTo
};

export default connect(
	null,
	mapDispatchToProps
)(ExplorePage);