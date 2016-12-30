/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {getPlayerIsShow} from '../../core/player';

import MainNav from './MainNav';

import './MainPage.css';

export class MainPage extends Component {
	render() {
		let {children, playerIsShow} = this.props;

		return (
			<div className={`main_page ${playerIsShow ? '' : 'player_is_hide'}`}>
				<MainNav/>

				<div className="main_sub_page">
					{children}
				</div>
			</div>
		)
	}
}

const mapStateToProps = createSelector(
	getPlayerIsShow,
	(playerIsShow) => {
		return {
			playerIsShow
		}
	}
);

export default connect(
	mapStateToProps
)(MainPage);