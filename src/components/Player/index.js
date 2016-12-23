/**
 * Created by jiawei6 on 2016/11/22.
 */
import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Link} from 'react-router';
import {is} from 'immutable';

import {getPlayer, playerActions} from '../../core/player';
import {entityReplace, time2Min} from '../../core/utils';
import {ALBUM_PHOTO_90_URL} from '../../core/constants';
import PlayList from './PlayList';
import PlayProgressBar from './PlayProgressBar';
import VoiceBar from './VoiceBar';

import './Player.css';

class Player extends React.Component {

	constructor() {
		super(...arguments);

		this.handleTimeClick = this.handleTimeClick.bind(this);
		this.handleVoiceClick = this.handleVoiceClick.bind(this);
		this.handlePlayModeClick = this.handlePlayModeClick.bind(this);
		this.handlePlayListClick = this.handlePlayListClick.bind(this);
	}

	handleTimeClick(event) {
		const {currentTarget, pageX} = event;
		const {seekTime, player: {times: {duration}}} = this.props;

		seekTime(
			(pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * duration
		);
	}

	handleVoiceClick(event) {
		const {currentTarget, target, pageX} = event;
		const {setVolume, mute} = this.props;

		if (target.nodeName === 'A') {
			mute(!target.classList.contains('btn_big_voice_muted'))
		} else {
			setVolume((pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth)
		}
	}

	handlePlayModeClick() {
		this.props.switchPlayMode();
	}

	handlePlayListClick() {
		const {showPlayList, player: {playListIsShow}} = this.props;
		showPlayList(!playListIsShow);
	}

	shouldComponentUpdate(nextProps) {
		return !is(nextProps, this.props);
	}

	render() {
		const {
			playSong,
			pauseSong,
			playNextSong,
			playPrevSong,
			playSelectedSong,
			deleteSong,
			showPlayList,
			player: {
				isPlaying,
				currentSong,
				times: {
					duration,
					currentTime,
					percentBuffered,
					percentCompleted
				},
				playMode,
				playList,
				volume,
				muted,
				playListIsShow
			}
		} = this.props;

		return (
			<div className="g-btmbar">
				<div className="m-playbar">
					<span className="btn_big_prev" onClick={playPrevSong}/>
					{
						isPlaying
							? <span className="btn_big_pause" onClick={pauseSong}/>
							: <span className="btn_big_play" onClick={playSong}/>
					}
					<span className="btn_big_next" onClick={playNextSong}/>
					{
						currentSong &&
						<Link to="/play">
							<img alt={currentSong.songname} src={`${ALBUM_PHOTO_90_URL}${currentSong.albummid}.jpg`} className="player_music_pic"/>
						</Link>
					}
					<div className="player_music">
						{
							currentSong &&
							<div className="player_music_info">
								{
									<Link to={`/play`}>{entityReplace(currentSong.songname)}</Link>
								}
								<span> - </span>
								{currentSong.singer.map(({name, mid}, i) => [
									i !== 0 && ' / ',
									<Link to={`/singer/song/${mid}`}>{entityReplace(name)}</Link>
								])}
							</div>
						}
						{
							currentSong &&
								<div className="player_music_time">{time2Min(currentTime)} / {time2Min(duration)}</div>
						}
						<PlayProgressBar handleTimeClick={this.handleTimeClick} percentBuffered={percentBuffered} percentCompleted={percentCompleted}/>
					</div>
					<a className={`btn_big_style_${playMode}`} onClick={this.handlePlayModeClick}/>
					<a className='player_playlist_btn' onClick={this.handlePlayListClick}/>
					<VoiceBar handleVoiceClick={this.handleVoiceClick} muted={muted} volume={volume}/>
					{
						playListIsShow && playList &&
						<PlayList
							datas={playList}
							playSelectedSong={playSelectedSong}
							currentSongId={currentSong ? currentSong.songid : null}
							showPlayList={showPlayList}
							isPlaying={isPlaying}
							deleteSong={deleteSong}
						/>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = createSelector(
	getPlayer,
	(player) => {
		return {
			player: player
		}
	}
);

const mapDispatchToProps = {
	playSong: playerActions.playSong,
	loadSong: playerActions.loadSong,
	pauseSong: playerActions.pauseSong,
	playNextSong: playerActions.playNextSong,
	playPrevSong: playerActions.playPrevSong,
	deleteSong: playerActions.deleteSong,
	seekTime: playerActions.seekTime,
	setVolume: playerActions.setVolume,
	mute: playerActions.mute,
	switchPlayMode: playerActions.switchPlayMode,
	playSelectedSong: playerActions.playSelectedSong,
	showPlayList: playerActions.showPlayList
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Player);
