import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../src/reducers/notificationReducer'
//reducers...

import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import loggedInUserReducer from './reducers/loggedInUserReducer';
import loginInfoReducer from './reducers/loginInfoReducer'


const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer,
    user: loggedInUserReducer,
    loginInfo: loginInfoReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe((s) => {
    console.log("logging at each update: ", store.getState())
    console.log(s)
  })
export default store