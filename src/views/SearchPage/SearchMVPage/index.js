/**
 * Created by jiawei6 on 2016/11/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import MVList from '../../../components/MVList';
import {searchActions, getSearchMV} from '../../../core/search';
import PageNav from '../../../components/PageNav';
import {LOAD_SEARCH_MV_CONFIG} from '../../../core/constants';

export class SearchMVPage extends Component {

	componentWillMount() {
		const {album, loadSearch, location: {query: {q}}} = this.props;

		if ((!album || album.get('keyword') !== q)) {
			loadSearch({
				...LOAD_SEARCH_MV_CONFIG,
				w: q
			})
		}
	}

	handleNavClick(e) {
		const {loadSearch, location: {query: {q}}, data} = this.props;
		const value = e.target.getAttribute('value');
		const curpage = data.get('mv').get('curpage');

		if (value) {
			loadSearch({
				...LOAD_SEARCH_MV_CONFIG,
				w: q,
				p: value === 'next' ? curpage + 1 : value === 'prev' ? curpage - 1 : value,
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.data, this.props.data);
	}

	render() {
		const {data} = this.props;
		if (data) {
			const {mv: {curpage, list, totalnum}, keyword} = data.toJS();
			const totalpage = Math.ceil(totalnum / LOAD_SEARCH_MV_CONFIG.n);

			return (
				<div className="search_mvlist_wrap">
					<MVList list={list} keyword={keyword.trim()}/>
					<PageNav curpage={curpage} totalpage={totalpage} handleNavClick={this.handleNavClick.bind(this)}/>
				</div>
			)
		} else {
			return (
				<div>加载中...</div>
			);
		}
	}
}

const mapStateToProps = createSelector(
	getSearchMV,
	mv => ({
		data: mv
	})
);

const mapDispatchToProps = {
	loadSearch: searchActions.loadSearch
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchMVPage);