// Reducer는 여러 가지가 있을 수 있어서, 이것을 combineReducers를 이용해서 합친다.
import { combineReducers } from "redux";
import user from './user_reducer';

// 여기에서 여러가지 redux를 하나로 합친다.
const rootReducer = combineReducers({
    user
});

export default rootReducer;