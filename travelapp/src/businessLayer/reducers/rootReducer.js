import { combineReducers } from 'redux';
import { authorizeReducer} from './AuthorizeReducer';

// export interface RootReducerState {
//     gameMode: GameModeState;
//     authorize: IsAuthorizeState;
//     adminCategory: AdminCategoryState;
// }

export const rootReducer = combineReducers({
    authorize: authorizeReducer
});