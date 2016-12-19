/**
 * Created by jiawei6 on 2016/11/23.
 */
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchSongPage from './SearchSongPage';
import SearchNav from './SearchNav';

import './SearchPage.css';

export default class SearchPage extends Component {
	render() {
		const {children, location: {query, pathname}} = this.props;
		return (
			<div>
				<SearchNav query={query}/>

				<ReactCSSTransitionGroup
					component="div"
					transitionName="example"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				>
					{React.cloneElement(children || <SearchSongPage/>, {
						key: pathname
					})}
				</ReactCSSTransitionGroup>


			</div>
		)
	}
}