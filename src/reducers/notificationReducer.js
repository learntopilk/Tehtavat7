//const notificationAtStart = "Hallo"


const notificationReducer = (store = "", action) => {

    switch (action.type) {
  
    case "SET":
      return action.content
    case "CREATE":
      const retu = `You created "${action.content}"`
      return retu
    case "RESET":
      return ""
    default:
      return store
  
  
    }
  }

export const notify = (message, timeInSeconds) => {
    return async (dispatch) => {
        await dispatch({
            type: "SET",
            content: message
        })
        setTimeout(() => {
            dispatch({
                type: "RESET"
            })
        }, timeInSeconds * 1000)
    }
}

export default notificationReducer