/**
 * Created by jiawei6 on 2016/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Link} from 'react-router';

import {getSinger, singerActions} from '../../../core/singer';
import {getPathLastFromProps} from '../../../core/utils';

import './SingerSimilarPage.css';

export class SingerSimilarPage extends Component {

	componentWillMount() {
		const {loadSingerSimilar, similar} = this.props;
		const mid = getPathLastFromProps(this.props);

		if (!similar.lastFetchMid || similar.lastFetchMid !== mid) {
			loadSingerSimilar({
				singer_mid: mid
			});
		}
	}

	render() {
		const {similar} = this.props;

		if (!similar.data) {
			return (
				<div>加载中...</div>
			);
		} else {
			const {items} = similar.data;
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
		}
	}
}

const mapStateToProps = createSelector(
	getSinger,
	(singer) => {
		const {similar} = singer;

		return {
			similar: similar.toJS()
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