/**
 * Created by jiawei6 on 2016/11/22.
 */
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import {searchReducer} from './search';
import {singerReducer} from './singer';
import {albumReducer} from './album';
import {playerReducer} from './player';
import {toplistReducer} from './toplist';

export default combineReducers({
	search: searchReducer,
	routing: routerReducer,
	singer: singerReducer,
	album: albumReducer,
	player: playerReducer,
	toplist: toplistReducer
})