/**
 * Created by jiawei6 on 2016/11/22.
 */

export const API_SEARCH_SUGGEST_URL = '//c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';
export const API_SEARCH_HOT_URL = '//c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
export const API_SEARCH_URL = '//c.y.qq.com/soso/fcgi-bin/search_cp';

export const LOAD_SEARCH_ALBUM_CONFIG = {
	catZhida: 1,
	p: 1,
	n: 20,
	t: 8
};

export const LOAD_SEARCH_SONG_CONFIG = {
	catZhida: 1,
	p: 1,
	n: 20,
	cr: 1,
	t: 0
	//aggr: 1
};

export const LOAD_SEARCH_MV_CONFIG = {
	catZhida: 1,
	p: 1,
	n: 28,
	t: 12
};


export const API_SINGER_SONG_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
export const API_SINGER_SONG_CONFIG = {
	num: 30,
	begin: 0,
	order: 'listen'
};

export const API_SINGER_DATA_URL = `${API_SINGER_SONG_URL}?num=1&from=h5`;
export const API_SINGER_ALBUM_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg';
export const API_SINGER_ALBUM_CONFIG = {
	num: 30,
	begin: 0,
	order: 'time'
};

export const API_SINGER_MV_URL = '//c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg';
export const API_SINGER_MV_CONFIG = {
	cid: 205360581,
	order: 'listen',
	begin: 0,
	num: 28,
	platform: 'yqq'
};

export const API_SINGER_SIMILAR_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg?format=jsonp';


export const API_ALBUM_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg';


export const API_PLAY_URL = '//ws.stream.qqmusic.qq.com'; // //stream9.qqmusic.qq.com || //ws.stream.qqmusic.qq.com


export const API_TOPLIST_ALL_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg';
export const API_TOPLIST_ALL_CONFIG = {
	page: 'index',
	format: 'html',
	tpl: 'macv4',
	v8debug: '1'
};

export const API_TOPLIST_ONE_URL = '//c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
export const API_TOPLIST_ONE_CONFIG = {
	format: 'jsonp',
	song_begin: 0,
	song_num: 999,
	type: 'top'
};


export const API_SONG_INFO_URL = '//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg';
export const API_SONG_INFO_CONFIG = {
	format: 'jsonp'
};


export const ALBUM_PHOTO_90_URL = '//y.gtimg.cn/music/photo_new/T002R90x90M000';
export const ALBUM_PHOTO_300_URL = '//y.gtimg.cn/music/photo_new/T002R300x300M000';
export const SINGER_PHOTO_300_URL = '//y.gtimg.cn/music/photo_new/T001R300x300M000';


export const PLAY_MODE = ['order', 'random', 'single', 'list']; // order 顺序播放 random 随机播放 single 单曲循环 list 列表循环
