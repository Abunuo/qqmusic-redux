/**
 * Created by jiawei6 on 2016/12/6.
 */
export {singerActions, singerRequestActions} from './actions';
export {singerEpics} from './epcis';
export {singerReducer} from './reducers';
export {
	getSinger,
	getSingerData,
	getSingerDataData,
	getSingerDataLastMid,
	getSingerSong,
	getSingerSongData,
	getSingerSongLastMid,
	getSingerSongBegin
} from './selectors';