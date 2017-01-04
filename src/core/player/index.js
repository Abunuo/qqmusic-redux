/**
 * Created by jiawei6 on 2016/12/8.
 */
export {playerActions, playerRequestActions} from './actions';
export {playerReducer, PlayerState} from './reducers';
export {playerEpics} from './epics';
export {audio} from './audio-service';

export {getPlayer, getPlayerIsShow} from './selectors';