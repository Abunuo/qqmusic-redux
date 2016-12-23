/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import SingerSongPage from './SingerSongPage';
import SingerPageNav from './SingerPageNav';
import {getPathLastFromProps} from '../../core/utils';
import {singerActions, getSingerDataData, getSingerDataLastMid} from '../../core/singer';
import {SINGER_PHOTO_300_URL} from '../../core/constants';

import './SingerPage.css';

export class SingerPage extends Component {

	componentWillReceiveProps(nextProps) {
		const {loadSingerData, lastFetchMid} = nextProps;
		const mid = getPathLastFromProps(nextProps);

		if (!lastFetchMid || lastFetchMid !== mid) {
			loadSingerData({
				singermid: mid
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		const {data: nextData, location: {pathname: nextPathname}} = nextProps;
		const {data, location: {pathname}} = this.props;
		return !is(nextData, data) || !is(pathname, nextPathname);
	}

	render() {
		const {children, data} = this.props;
		const mid = getPathLastFromProps(this.props);
		if (data) {
			const {singer_name, fans, SingerDesc} = data.toJS();
			return (
				<div>
					<div className="singer_page_header">
						<img alt={singer_name} className="data_photo" src={`${SINGER_PHOTO_300_URL}${mid}.jpg`}/>
						<div className="data_box">
							<span className="data_name_txt">{singer_name}</span>
							<span className="data_fans_txt">粉丝数：{fans}</span>
							<div className="data_desc">{SingerDesc}</div>
						</div>
					</div>
					<SingerPageNav mid={mid}/>
					{children || <SingerSongPage/>}
				</div>
			)
		} else {
			return (
				<div>
					加载中...
					<SingerPageNav mid={mid}/>
					{children || <SingerSongPage/>}
				</div>
			)
		}

	}
}

const mapStateToProps = createSelector(
	getSingerDataLastMid,
	getSingerDataData,
	(lastFetchMid, data) => {
		return {
			lastFetchMid,
			data
		}
	}
);

const mapDispatchToProps = {
	loadSingerData: singerActions.loadSingerData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerPage);