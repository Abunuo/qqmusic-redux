/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {getPlayer} from '../../core/player';
import {ALBUM_PHOTO_300_URL} from '../../core/constants';

import './PlayPage.css';

export class PlayPage extends Component {

	shouldComponentUpdate(nextProps) {
		return !is(this.props.currentSong, nextProps.currentSong);
	}

	render() {
		const {currentSong} = this.props;
		return (
			<div className="play_page">
				我是PlayPage
				<img
					alt={currentSong.get('songname')}
					src={`${ALBUM_PHOTO_300_URL}${currentSong.get('albummid')}.jpg`}
				    className="play_page_pic"
				/>
			</div>
		)
	}
}

const mapStateToProps = createSelector(
	getPlayer,
	(player) => {
		return {
			currentSong: player.get('currentSong')
		}
	}
);

const mapDispatchToProps = {
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayPage);