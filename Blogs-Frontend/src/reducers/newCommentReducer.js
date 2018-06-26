const newCommentReducer = (store = '', action) => {
  switch(action.type) {
  case 'RESET_COMMENT':
    return ''
  case 'UPDATE_COMMENT':
    return action.comment
  default:
    return store
  }
}

export const resetComment = () => {
  return async (dispatch) => {
    dispatch({
      type: 'RESET_COMMENT'
    })
  }
}

export const updateComment = (comment) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_COMMENT',
      comment
    })
  }
}


export default newCommentReducer