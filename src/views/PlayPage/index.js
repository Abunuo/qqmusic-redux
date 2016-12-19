/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getPlayer} from '../../core/player';

import './PlayPage.css';

export class PlayPage extends Component {
	render() {
		return (
			<div className="play_page">
				我是PlayPage
			</div>
		)
	}
}

const mapStateToProps = createSelector(
	getPlayer,
	(player) => {
		return {
			currentSong: player.currentSong
		}
	}
);

const mapDispatchToProps = {
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayPage);