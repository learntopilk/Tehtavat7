import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../src/reducers/notificationReducer'
//reducers...

import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';


const reducer = combineReducers({
    notification: notificationReducer,
    users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => {
    console.log("logging at each update: ", store.getState())
  })
export default store