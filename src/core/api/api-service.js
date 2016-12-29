/**
 * Created by jiawei6 on 2016/11/23.
 */
import fetchJsonp from 'fetch-jsonp';

import {
	API_SEARCH_SUGGEST_URL,
	API_SEARCH_HOT_URL,
	API_SEARCH_URL,
	API_SINGER_SONG_URL,
	API_SINGER_SONG_CONFIG,
	API_SINGER_DATA_URL,
	API_SINGER_ALBUM_URL,
	API_SINGER_ALBUM_CONFIG,
	API_SINGER_MV_URL,
	API_SINGER_MV_CONFIG,
	API_SINGER_SIMILAR_URL,
	API_ALBUM_URL,
	API_TOPLIST_ALL_URL,
	API_TOPLIST_ALL_CONFIG,
	API_TOPLIST_ONE_URL,
	API_TOPLIST_ONE_CONFIG,
	API_SONG_INFO_URL,
	API_SONG_INFO_CONFIG
} from '../constants';

export const api = {

	fetchSearchHot() {
		return dispatch(API_SEARCH_HOT_URL, null,
			{
				jsonpCallbackFunction: 'fetchSearchSuggest'
			});
	},

	fetchSearchSuggest(param) {
		return dispatch(
			API_SEARCH_SUGGEST_URL,
			{
				key: param.query
			},
			{
				jsonpCallbackFunction: 'fetchSearchSuggest'
			}
		);
	},

	fetchSearch(param) {
		return dispatch(
			API_SEARCH_URL,
			{
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSearch'
			}
		)
	},

	fetchSingerSong(param) {
		return dispatch(
			API_SINGER_SONG_URL,
			{
				...API_SINGER_SONG_CONFIG,
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSingerSong'
			}
		)
	},

	fetchSingerData(param) {
		return dispatch(
			API_SINGER_DATA_URL,
			{
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSingerData'
			}
		)
	},

	fetchSingerAlbum(param) {
		return dispatch(
			API_SINGER_ALBUM_URL,
			{
				...API_SINGER_ALBUM_CONFIG,
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSingerAlbum'
			}
		)
	},

	fetchSingerMV(param) {
		return dispatch(
			API_SINGER_MV_URL,
			{
				...API_SINGER_MV_CONFIG,
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSingerMV'
			}
		)
	},

	fetchSingerSimilar(param) {
		return dispatch(
			API_SINGER_SIMILAR_URL,
			{
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSingerSimilar'
			}
		)
	},

	fetchAlbum(param) {
		return dispatch(
			API_ALBUM_URL,
			{
				...param
			},
			{
				jsonpCallbackFunction: 'fetchAlbum'
			}
		)
	},

	fetchToplistAll() {
		return dispatch(
			API_TOPLIST_ALL_URL,
			API_TOPLIST_ALL_CONFIG,
			{
				jsonpCallbackFunction: 'jsonCallback'
			}
		)
	},

	fetchToplistOne(param) {
		return dispatch(
			API_TOPLIST_ONE_URL,
			{
				...API_TOPLIST_ONE_CONFIG,
				...param
			},
			{
				jsonpCallbackFunction: 'fetchToplistOne'
			}
		)
	},

	fetchSongInfo(param) {
		return dispatch(
			API_SONG_INFO_URL,
			{
				...API_SONG_INFO_CONFIG,
				...param
			},
			{
				jsonpCallbackFunction: 'fetchSongInfo',
				jsonpCallback: 'callback'
			}
		)
	}
};

export function dispatch(url, options, {jsonpCallback = 'jsonpCallback', jsonpCallbackFunction = null} = {}) {
	options = options || {};
	return fetchJsonp(requestUrl(url, options), {jsonpCallback, jsonpCallbackFunction})
		.then(response => response.json())
		.then(json => json);
}

export function requestUrl(url, param = {}) {
	url += url.indexOf('?') === -1 ? '?' : '&';

	for (let p in param) {
		if (param.hasOwnProperty(p)) {
			url += `${p}=${param[p]}&`;
		}
	}
	url = url.slice(0, -1);

	return url;
}