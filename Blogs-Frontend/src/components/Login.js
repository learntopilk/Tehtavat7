import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loggedInUserReducer'
import { updateLoginInfo, resetLoginInfo } from '../reducers/loginInfoReducer'
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
      try {
        console.log('logininfo: ', this.props.loginInfo)
        const userObj = this.props.loginInfo
        let c = await this.props.login(userObj)

        await this.props.resetLoginInfo()

        this.props.history.push('/')


      } catch (err) {
        console.log(err)
        this.props.notify('Taisi tulla virhe kirjautuessa...', 5)
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
  console.log('store:', store)
  return ({
    user: store.user,
    loginInfo: store.loginInfo,
    blogs: store.blogs
  })
}

const mapDispatchToProps = { login, notify, updateLoginInfo, resetLoginInfo }

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectedLogin