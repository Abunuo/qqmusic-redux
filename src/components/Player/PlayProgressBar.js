/**
 * Created by jiawei6 on 2016/12/13.
 */
import React, {PropTypes} from 'react';

export const PlayProgressBar = ({handleTimeClick, percentCompleted, percentBuffered}) => (
	<div className="player_progress" onClick={handleTimeClick}>
		<div className="player_progress_inner">
			<div className="player_progress_load" style={{width: percentBuffered}}></div>
			<div className="player_progress_play" style={{width: percentCompleted}}></div>
		</div>
	</div>
);

PlayProgressBar.propTypes = {
	handleTimeClick: PropTypes.func.isRequired,
	percentBuffered: PropTypes.string.isRequired,
	percentCompleted: PropTypes.string.isRequired
};

export default PlayProgressBar;