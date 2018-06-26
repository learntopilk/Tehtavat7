import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../src/reducers/notificationReducer'
//reducers...

import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import loggedInUserReducer from './reducers/loggedInUserReducer';
import loginInfoReducer from './reducers/loginInfoReducer'
import newCommentReducer from './reducers/newCommentReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer,
    user: loggedInUserReducer,
    loginInfo: loginInfoReducer,
    newComment: newCommentReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe((s) => {
    console.log("logging at each update: ", store.getState())
  })
export default store