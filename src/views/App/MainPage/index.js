/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {Component} from 'react';

import MainNav from './MainNav';

import './MainPage.css';

export default class MainPage extends Component {
	render() {
		let {children} = this.props;

		return (
			<div className="main_page">
				<MainNav/>

				<div className="main_sub_page">
					{children}
				</div>
			</div>
		)
	}
}