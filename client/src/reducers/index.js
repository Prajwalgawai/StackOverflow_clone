import {combineReducers} from 'redux';
import authReducer from "./auth.js";
import currentUserReducer from './currentUser.js';
import questionsReducer from './questions';
import usersReducer from './users.js';
import fetchWeather from './fetchWeather.js';
import questionVoteScore from './questionVoteScore.js';
import getUser from './getUser.js';
export default combineReducers({
        authReducer, currentUserReducer, questionsReducer, usersReducer,
        fetchWeather,questionVoteScore,getUser
})