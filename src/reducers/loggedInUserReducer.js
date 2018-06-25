import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedInUserReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            console.log("user at reducer: ", action.user)
            return action.user
        case 'CONT':
            return action.user
        case 'INIT_USER':
            console.log("INITED USR:", action)
            return action.user
        case 'LOGOUT':
            return null
        default:
            console.log("Default at user: ")
            return state
    }
}

export const login = (userTryingToLogin) => {
    console.log("logging user ", userTryingToLogin)
    return async(dispatch) => {

        const user = await loginService.login(userTryingToLogin);
        blogService.setToken(user.token)

        await window.localStorage.setItem('loggedUser', JSON.stringify(user))

        dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export const continueSession = (existingUser) => {
    console.log("Continuing session...", existingUser)
    return async(dispatch) => {
        dispatch({
            type: 'CONT',
            user: existingUser
        })
    }
}

export const initializeUser = () => {

    return async(dispatch) => {
        const user = JSON.parse(window.localStorage.getItem('loggedUser'))
        dispatch({
            type: 'INIT_USER',
            user
        })
    }
}

export const logout = () => {
    return async(dispatch) => {
        window.localStorage.clear()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default loggedInUserReducer