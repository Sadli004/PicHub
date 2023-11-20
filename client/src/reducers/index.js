import  {combineReducers}  from "redux";
import userReducer from "./user.reducer";
import allUsersReducer from"./allUsers.reducer"
import  {postReducer}  from "./post.reducer";
import trendingReducer from "./trending.reducer";
import allPostsReducer from "./allPosts.reducer";
import {errorReducer} from './error.reducer'

const rootReducer =   combineReducers({ 
    userReducer,
    allUsersReducer,
    postReducer,
    allPostsReducer,
    trendingReducer,
    errorReducer
});

export default rootReducer;