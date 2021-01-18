import { combineReducers } from 'redux'
import initReducer from './init';

const rootReducer = combineReducers({
    returnedInitReducer: initReducer,
})

export default rootReducer;