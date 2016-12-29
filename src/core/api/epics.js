/**
 * Created by jiawei6 on 2016/12/1.
 */
import {Observable} from 'rxjs/Observable';

import {searchRequestActions} from '../../core/search';
import {singerRequestActions} from '../../core/singer';
import {albumRequestActions} from '../../core/album';
import {toplistRequestActions} from '../../core/toplist';
import {playerRequestActions} from '../../core/player';
import {api} from './api-service';

const fetchEntities = function (apiFunction, actions, type, param) {

	return Observable.create(function (observer) {

		observer.next(actions.pending({
			type,
			param
		}));

		apiFunction(param)
			.then(function (data) {
				observer.next(actions.fulfilled({
					type,
					param,
					result: data
				}));
			})
			.catch(function (error) {
				observer.next(actions.failed({
					type,
					param,
					error
				}))
			});
	})
};

export const fetchSearchSuggest = fetchEntities.bind(null, api.fetchSearchSuggest, searchRequestActions, 'suggest');
export const fetchSearchHot = fetchEntities.bind(null, api.fetchSearchHot, searchRequestActions, 'hot');
export const fetchSearch = fetchEntities.bind(null, api.fetchSearch, searchRequestActions);

export const fetchSingerSong = fetchEntities.bind(null, api.fetchSingerSong, singerRequestActions, 'song');
export const fetchSingerData = fetchEntities.bind(null, api.fetchSingerData, singerRequestActions, 'data');
export const fetchSingerAlbum = fetchEntities.bind(null, api.fetchSingerAlbum, singerRequestActions, 'album');
export const fetchSingerMV = fetchEntities.bind(null, api.fetchSingerMV, singerRequestActions, 'mv');
export const fetchSingerSimilar = fetchEntities.bind(null, api.fetchSingerSimilar, singerRequestActions, 'similar');

export const fetchAlbum = fetchEntities.bind(null, api.fetchAlbum, albumRequestActions, null);

export const fetchToplistAll = fetchEntities.bind(null, api.fetchToplistAll, toplistRequestActions, 'all');
export const fetchToplistOne = fetchEntities.bind(null, api.fetchToplistOne, toplistRequestActions, 'one');

export const fetchSongInfo = fetchEntities.bind(null, api.fetchSongInfo, playerRequestActions, null);