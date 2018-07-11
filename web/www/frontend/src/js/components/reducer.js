import {combineReducers} from 'redux';

const userInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_USERINFO_SUCCESS':
            return action.userInfo;
        default:
            return state;
    }
};

const postsReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return action.posts;
        default: 
            return state;
    }
}

export const rootReducer = combineReducers({
    userInfo : userInfoReducer,
    posts : postsReducer
});