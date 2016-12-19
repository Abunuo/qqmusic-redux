/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {searchActions, getSearch} from '../../../core/search';

export class SingerMVPage extends Component {

	render() {
		return (
			<div>SingerMVPage...</div>
		);
	}
}

const mapStateToProps = createSelector(
	getSearch,
	(search) => {
		const {album} = search
		return {
			album: album && album.toJS(),
			search: search.toJS()
		}
	}
);

const mapDispatchToProps = {
	loadSearch: searchActions.loadSearch
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerMVPage);