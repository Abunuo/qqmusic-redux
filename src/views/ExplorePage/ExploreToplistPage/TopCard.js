/**
 * Created by jiawei6 on 2016/12/13.
 */
import React, {PropTypes} from 'react';

import {entityReplace} from '../../../core/utils';

export const TopCard = ({data}) => (
	<div className="explore_toplist_card">
		<img src={data.pic_v12} alt={data.ListName}/>
		<div className="explore_toplist_card_songlist">
			{data.songlist.map((song, i) => {
				return (
					<div key={i} className="explore_toplist_card_song">
						<span className="color_gray">{i + 1}&nbsp;&nbsp;</span>
						<span>{entityReplace(song.songname)}</span>
						<span className="color_gray">&nbsp;-&nbsp;</span>
						<span className="color_gray">{entityReplace(song.singername)}</span>
					</div>
				)
			})}
		</div>
	</div>
);

TopCard.propTypes = {
	data: PropTypes.object.isRequired,
};

export default TopCard;