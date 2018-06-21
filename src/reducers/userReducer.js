import userService from '../services/users'

const userReducer = (state = [], action) => {

    switch(action.type) {
        case 'INIT_USERS':
            console.log('action.users: ', action.users)
            return action.users
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAllUsers()
        //console.log("users:", users)
        dispatch({
            type: 'INIT_USERS',
            users
        })
    }
}

export default userReducer