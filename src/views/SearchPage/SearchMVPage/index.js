/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {searchActions, getSearchMV} from '../../../core/search';

export class SearchMVPage extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<div>
				SearchMVPage
			</div>
		)
	}
}

const mapStateToProps = createSelector(
	getSearchMV,
	mv => ({
		mv
	})
);

const mapDispatchToProps = {
	loadSingerMV: searchActions.loadSingerMV
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchMVPage);