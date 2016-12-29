/**
 * Created by jiawei6 on 2016/12/6.
 */
export function getSinger(state) {
	return state.singer;
}

export function getSingerData(state) {
	return getSinger(state).data;
}

export function getSingerDataLastMid(state) {
	return getSingerData(state).get('lastFetchMid');
}

export function getSingerDataData(state) {
	return getSingerData(state).get('data');
}


export function getSingerSong(state) {
	return getSinger(state).song;
}

export function getSingerSongLastMid(state) {
	return getSingerSong(state).get('lastFetchMid');
}

export function getSingerSongData(state) {
	return getSingerSong(state).get('data');
}

export function getSingerSongBegin(state) {
	return getSingerSong(state).get('begin');
}


export function getSingerAlbum(state) {
	return getSinger(state).album;
}

export function getSingerAlbumLastMid(state) {
	return getSingerAlbum(state).get('lastFetchMid');
}

export function getSingerAlbumData(state) {
	return getSingerAlbum(state).get('data');
}

export function getSingerAlbumBegin(state) {
	return getSingerAlbum(state).get('begin');
}


export function getSingerSimilar(state) {
	return getSinger(state).similar;
}

export function getSingerSimilarLastMid(state) {
	return getSingerSimilar(state).get('lastFetchMid');
}

export function getSingerSimilarData(state) {
	return getSingerSimilar(state).get('data');
}

export function getSingerSimilarBegin(state) {
	return getSingerSimilar(state).get('begin');
}


export function getSingerMV(state) {
	return getSinger(state).mv;
}

export function getSingerMVLastMid(state) {
	return getSingerMV(state).get('lastFetchMid');
}

export function getSingerMVData(state) {
	return getSingerMV(state).get('data');
}

export function getSingerMVBegin(state) {
	return getSingerMV(state).get('begin');
}