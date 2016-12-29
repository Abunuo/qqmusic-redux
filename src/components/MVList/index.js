/**
 * Created by jiawei6 on 2016/12/29.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {entityReplace, lightKeyword} from '../../core/utils';

import './MVList.css';

export const MVListCard = ({pic ,mv_pic_url, singers, singerMID, singer_name, title, vid, v_id, listenCount, play_count, mv_name, i, keyword}) => (
	<li key={i} className="mvlist_item">
		<div className="mvlist_item_box">
			<Link className="mvlist_cover" to={`/mv/${vid || v_id}`}>
				<img className="mvlist_pic" src={pic || mv_pic_url} alt={lightKeyword(entityReplace(title|| mv_name))}/>
				<i className="mod_cover_mask"/>
				<i className="mod_cover_icon_play"/>
			</Link>
			<h3 className="mvlist_title">
				<Link to={`/mv/${vid || v_id}`}>{lightKeyword(entityReplace(title || mv_name), keyword)}</Link>
				&nbsp;-&nbsp;
				{singers
					?
					singers.map(({singer_name, singer_mid}, i) => [
						i !== 0 && ' / ',
						<Link to={`/singer/song/${singer_mid}`}>{lightKeyword(entityReplace(singer_name), keyword)}</Link>
					])
					:
					<Link to={`/singer/song/${singerMID}`}>{lightKeyword(entityReplace(singer_name), keyword)}</Link>
				}
			</h3>
			<div className="mvlist_info">
					<span className="mvlist_listen">
						<i className="mvlist_listen_icon"/>
						{listenCount || play_count}
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