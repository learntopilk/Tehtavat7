import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../src/reducers/notificationReducer'
//reducers...

import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';


const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {
    console.log("logging at each update: ", store.getState())
  })
export default store