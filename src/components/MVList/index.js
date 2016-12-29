/**
 * Created by jiawei6 on 2016/12/29.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {entityReplace, lightKeyword} from '../../core/utils';

import './MVList.css';

export const MVListCard = ({pic, singers, singer_mid, singer_name, title, vid, listenCount, i, keyword}) => (
	<li key={i} className="mvlist_item">
		<div className="mvlist_item_box">
			<Link className="mvlist_cover" to={`/mv/${vid}`}>
				<img className="mvlist_pic" src={pic} alt={lightKeyword(entityReplace(title))}/>
				<i className="mod_cover_mask"/>
				<i className="mod_cover_icon_play"/>
			</Link>
			<h3 className="mvlist_title">
				<Link to={`/mv/${vid}`}>{lightKeyword(entityReplace(title), keyword)}</Link>
				&nbsp;-&nbsp;
				{singers
					?
					singers.map(({singer_name, singer_mid}, i) => [
						i !== 0 && ' / ',
						<Link to={`/singer/song/${singer_mid}`}>{lightKeyword(entityReplace(singer_name), keyword)}</Link>
					])
					:
					<Link to={`/singer/song/${singer_mid}`}>{lightKeyword(entityReplace(singer_name), keyword)}</Link>
				}
			</h3>
			<div className="mvlist_info">
					<span className="mvlist_listen">
						<i className="mvlist_listen_icon"/>
						{listenCount}
					</span>
			</div>
		</div>
	</li>
);

const renderItem = (data, i, keyword) => MVListCard({
	...data,
	i,
	keyword
});

export const MVList = ({list, keyword}) => (
	<ul className="mvlist">
		{
			list.map(function (data, i) {
				return renderItem(data, i, keyword);
			})
		}
	</ul>
);

MVList.propTypes = {
	list: PropTypes.array.isRequired
};

export default MVList