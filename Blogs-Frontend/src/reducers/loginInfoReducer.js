const emptyLoginInfo = {
    username: "",
    password: ""
}

const loginInfoReducer = (store = emptyLoginInfo, action) => {
    switch(action.type) {
        case 'UPDATE_LINFO':
            return action.data
        case 'RESET_LINFO':
            return action.data
        default:
            return store
    }
}

export const updateLoginInfo = (userInfoObj) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LINFO',
            data: userInfoObj
        })
    }
}

export const resetLoginInfo = () => {
    return (dispatch) => {
        dispatch({
            type: 'RESET_LINFO',
            data: emptyLoginInfo
        })
    }
}

export default loginInfoReducer