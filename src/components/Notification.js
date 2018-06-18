import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {


    render() {
        const notification = this.props.notification
        const style = {
            border: "solid",
            padding: 12,
            borderWidth: 3
        }
        return (
            <div style={style}>
                {notification}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification