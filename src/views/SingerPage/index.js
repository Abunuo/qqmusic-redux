/**
 * Created by jiawei6 on 2016/11/28.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import SingerSongPage from './SingerSongPage';
import SingerPageNav from './SingerPageNav';
import {getPathLastFromProps} from '../../core/utils';
import {singerActions, getSinger} from '../../core/singer';
import {SINGER_PHOTO_300_URL} from '../../core/constants';

import './SingerPage.css';

export class SingerPage extends Component {

/*	componentWillMount() {
		const {loadSingerData, data} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!data.lastFetchMid || data.lastFetchMid !== mid) {console.log(data, mid)
			loadSingerData({
				singermid: mid
			})
		}
	}*/

	componentWillReceiveProps(nextProps) {
		const {loadSingerData, data} = nextProps;
		const mid = getPathLastFromProps(nextProps);

		if (!data.lastFetchMid || data.lastFetchMid !== mid) {
			loadSingerData({
				singermid: mid
			})
		}
	}


	render() {
		const {children, data: {data}} = this.props;
		const mid = getPathLastFromProps(this.props);
		if (data) {
			const {singer_name, fans, SingerDesc} = data;
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
	getSinger,
	(singer) => {
		return {
			data: singer.data.toJS()
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