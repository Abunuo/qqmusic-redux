/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import {nagivateActions} from '../../core/navigate';
import {playerActions} from '../../core/player';

export class SearchResultItem extends Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		singer: PropTypes.string
	};

	constructor() {
		super(...arguments);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {type, mid, navigateTo, playSelectedSong} = this.props;
		switch (type) {
			case 'album':
			case 'singer':
				navigateTo(`/${type}/song/${mid}`);
				break;
			case 'song':
				playSelectedSong({
					isMid: true,
					mid
				});
				break;
			default:
				navigateTo(`/${type}/${mid}`);
				break;
		}
	}

	render() {
		const {name, singer, type} = this.props;

		return (
			<li onMouseDown={this.handleClick} onTouchStart={this.handleClick}>{`${name}${type === 'singer' ? '' : ` - ${singer}`}`}</li>
		)
	}
}

const mapDispatchToProps = {
	navigateTo: nagivateActions.navigateTo,
	playSelectedSong: playerActions.playSelectedSong
};

export default connect(
	null,
	mapDispatchToProps
)(SearchResultItem);

