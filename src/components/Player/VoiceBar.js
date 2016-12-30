/**
 * Created by jiawei6 on 2016/12/13.
 */
import React, {PropTypes} from 'react';

export const VoiceBar = ({handleVoiceClick, muted, volume}) => (
	<div className="player_progress player_voice" onClick={handleVoiceClick}>
		<a className={`btn_big_voice ${muted ? 'btn_big_voice_muted' : ''}`}/>
		<div className="player_progress_inner">
			<div className="player_progress_play" style={{width: volume * 100 + '%'}}></div>
		</div>
	</div>
);

VoiceBar.propTypes = {
	handleVoiceClick: PropTypes.func.isRequired,
	muted: PropTypes.bool.isRequired,
	volume: PropTypes.number.isRequired
};

export default VoiceBar;