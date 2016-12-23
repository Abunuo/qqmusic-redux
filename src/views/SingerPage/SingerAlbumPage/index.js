/**
 * Created by jiawei6 on 2016/12/6.
 */
/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {is} from 'immutable';

import {singerActions, getSingerAlbumData, getSingerAlbumLastMid, getSingerAlbumBegin} from '../../../core/singer';
import AlbumList from '../../../components/AlbumList';
import PageNav from '../../../components/PageNav';
import {API_SINGER_ALBUM_CONFIG} from '../../../core/constants';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerAlbumPage.css';

export class SingerAlbumPage extends Component {

	componentWillMount() {
		const {loadSingerAlbum, lastFetchMid} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!lastFetchMid || lastFetchMid !== mid) {
			loadSingerAlbum({
				singermid: mid,
				begin: 0
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const {location: {pathname}, loadSingerAlbum} = this.props;

		if (nextProps.location.pathname !== pathname) {
			const mid = getPathLastFromProps(nextProps);

			loadSingerAlbum({
				singermid: mid,
				begin: 0
			})
		}
	}

	handleNavClick(e) {
		const {loadSingerAlbum} = this.props;
		const mid = getPathLastFromProps(this.props);
		const value = e.target.getAttribute('value');

		if (value) {
			loadSingerAlbum({
				begin: (value - 1) * API_SINGER_ALBUM_CONFIG.num,
				singermid: mid
			})
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.data, this.props.data);
	}

	render() {
		const {begin, data} = this.props;
		if (data) {
			const {list, total} = data.toJS();
			const {num} = API_SINGER_ALBUM_CONFIG;
			const totalpage = Math.ceil(total / num);
			const curpage = Math.floor(begin / num) + 1;

			return (
				<div className="singer_albumlist_wrap">
					<AlbumList datas={list}/>
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
	getSingerAlbumData,
	getSingerAlbumBegin,
	getSingerAlbumLastMid,
	(data, begin, lastFetchMid) => {
		return {
			data,
			lastFetchMid,
			begin
		}
	}
);

const mapDispatchToProps = {
	loadSingerAlbum: singerActions.loadSingerAlbum
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerAlbumPage);