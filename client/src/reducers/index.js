import {combineReducers} from 'redux';
import authReducer from "./auth.js";
import currentUserReducer from './currentUser.js';
import questionsReducer from './questions';
import usersReducer from './users.js';
export default combineReducers({
        authReducer, currentUserReducer, questionsReducer, usersReducer
})
