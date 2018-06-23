import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, withRouter } from 'react-router-dom'
//import loginService from '../services/login'
import loggedInUserReducer, { login, reset } from '../reducers/loggedInUserReducer'
import loginInfoReducer, {updateLoginInfo, resetLoginInfo} from '../reducers/loginInfoReducer'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }


    handleLoginFieldChange = (event) => {
        event.preventDefault()
        const logInfo = this.props.loginInfo
        logInfo[event.target.name] = event.target.value
        this.props.updateLoginInfo(logInfo)
    }

    startLogin = async (event) => {

        event.preventDefault()
       // console.log(this.props)
        try {
            console.log("logininfo: ", this.props.loginInfo)
            const userObj = this.props.loginInfo
            let c = await this.props.login(userObj)

            console.log("props:", this.props)
            console.log("logged in user ", this.props.user)
            
            //c = await this.props.notify(`Welcome, ${this.props.user.username}!`, 5)
            
            this.props.history.push("/")


        } catch (err) {
            console.log(err)
            this.props.notify(`Taisi tulla virhe kirjautuessa...`, 5)
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h4>Please log in</h4>
                <form onSubmit={this.startLogin}>
                    <div><span>username: <input type="text" name="username" onChange={this.handleLoginFieldChange} value={this.props.username} /></span></div>
                    <div><span>password: <input type="password" name="password" onChange={this.handleLoginFieldChange} value={this.props.password} /></span></div>
                    <button type="submit">login</button>                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    console.log("store:", store)
    return ({
        user: store.user,
        //username: state.username,
       // password: state.password,
        loginInfo: store.loginInfo,
        blogs: store.blogs
    })
}

const mapDispatchToProps = { login, notify, updateLoginInfo, resetLoginInfo }

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectedLogin