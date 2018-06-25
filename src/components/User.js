import React from 'react'
import userReducer from '../reducers/userReducer'
//import userService from '../services/users'
import { connect } from 'react-redux'

//const User = (user, props) => {
class User extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        if (!this.props.user) {
            return (<div>Not found or loading...</div>)
        } else {
            return (
                <div>
                    <h4>USER VIEW</h4>
                    <h4>{this.props.user.name}</h4>

                    <h5>Blogs added</h5>
                    <ul>
                        {this.props.user.blogs.map(b => { return (<li key={Date.now.toString().concat(b.title)}>{b.title}</li>) })}
                    </ul>

                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const connectedUser = connect(mapStateToProps)(User)
export default connectedUser