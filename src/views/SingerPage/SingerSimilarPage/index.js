/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Link} from 'react-router';
import {is} from 'immutable';

import {getSingerSimilarLastMid, getSingerSimilarData, getSingerSimilarBegin, singerActions} from '../../../core/singer';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerSimilarPage.css';

export class SingerSimilarPage extends Component {

	componentWillMount() {
		const {loadSingerSimilar, lastFetchMid} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!lastFetchMid || lastFetchMid !== mid) {
			loadSingerSimilar({
				singer_mid: mid
			});
		}
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps.data, this.props.data);
	}

	render() {
		const {data} = this.props;

		if (data) {
			const {items} = data.toJS();
			return (
				<div className="singerlist_wrap">
					<ul>
						{items.map((singer, i) => {
							const {pic, name, mid} = singer;
							return (
								<li key={i} className="singer_list_item">
									<div className="singer_list_item_box">
										<Link className="singer_list_cover" to={`/singer/song/${mid}`}>
											<img className="singer_list_pic" src={pic} alt={name}/>
										</Link>
										<Link className="singer_list_title" to={`/singer/song/${mid}`}>{name}</Link>
									</div>
								</li>
							);
						})}
					</ul>
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
	getSingerSimilarData,
	getSingerSimilarLastMid,
	getSingerSimilarBegin,
	(data, lastFetchMid, begin) => {
		return {
			data,
			lastFetchMid,
			begin
		}
	}
);

const mapDispatchToProps = {
	loadSingerSimilar: singerActions.loadSingerSimilar
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingerSimilarPage);