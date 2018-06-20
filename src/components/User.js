import React from 'react'
import userService from '../services/users'
import { connect } from 'react-redux'

const User = (props) => {
    return (
        <div></div>
    )
}

const mapStateToProps = {

}

const connectedUser = connect({mapStateToProps})(User)
export default User