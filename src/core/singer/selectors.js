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