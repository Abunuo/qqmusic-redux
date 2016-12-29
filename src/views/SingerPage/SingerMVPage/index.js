/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {singerActions, getSingerMVData, getSingerMVLastMid, getSingerMVBegin} from '../../../core/singer';
import PageNav from '../../../components/PageNav';
import {API_SINGER_MV_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerMVPage.css';

export class SingerMVPage extends Component {

	componentWillMount() {
		const {loadSingerMV, lastFetchMid} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!lastFetchMid || lastFetchMid !== mid) {
			loadSingerMV({
				singermid: mid,
				begin: 0
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerMV} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerMV({
				singermid: mid,
				begin: 0
			})
		}
	}

	handleNavClick(e) {
		const {loadSingerMV, begin} = this.props;
		const mid = getPathLastFromProps(this.props);
		const value = e.target.getAttribute('value');
		const {num} = API_SINGER_MV_CONFIG;

		if (value) {
			loadSingerMV({
				begin: value === 'next' ? begin + num : value === 'prev' ? begin - num : (value - 1) * num,
				singermid: mid
			})
		}
	}

	render() {
		const {begin, data} = this.props;
		if (data) {
			const {list, total} = data.toJS();
			const {num} = API_SINGER_MV_CONFIG;
			const totalpage = Math.ceil(total / num);
			const curpage = Math.floor(begin / num) + 1;

			return (
				<div className="singer_mvlist_wrap">
					<PageNav curpage={curpage} totalpage={totalpage} handleNavClick={this.handleNavClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				<div>加载中...</div>
			);
		}
	}
}


const mapStateToProps = createSelector(
	getSingerMVData,
	getSingerMVBegin,
	getSingerMVLastMid,
	(data, begin, lastFetchMid) => {
		return {
			data,
			lastFetchMid,
			begin
		}
	}
);

const mapDispatchToProps = {
	loadSingerMV: singerActions.loadSingerMV
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerMVPage);