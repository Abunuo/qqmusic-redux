/**
 * Created by jiawei6 on 2016/11/30.
 */
import {combineEpics} from 'redux-observable';
import {navigateEpics} from './navigate';
import {searchEpics} from './search';
import {singerEpics} from './singer';
import {albumEpics} from './album';
import {playerEpics} from './player';
import {toplistEpics} from './toplist';
import {localStoreEpics} from './localstore';

export default combineEpics(
	...navigateEpics,
	...searchEpics,
	...singerEpics,
	...albumEpics,
	...playerEpics,
	...toplistEpics,
	...localStoreEpics
);