import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import notificationReducer from './reducers/notificationReducer'
import { notify } from './reducers/notificationReducer'
import UserList from './components/UserList'
import userService from './services/users'
import userReducer, { initializeUsers } from './reducers/userReducer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      token: null,
      error: '',
      user: null,
      blogtitle: '',
      blogauthor: '',
      blogurl: '',
      loginVisible: false

    }

    this.deleteHandler = (id) => {
      let blogsToUpdate = []
      for (let i = 0; i < this.state.blogs.length; i++) {
        if (this.state.blogs[i].id === id) {
        } else {
          blogsToUpdate.push(this.state.blogs[i])
        }
      }
      this.setState({ blogs: blogsToUpdate })
    }



  }

  login = async (event) => {
    event.preventDefault()

    try {
      const userObj = { username: this.state.username, password: this.state.password }
      const user = await loginService.login(userObj)

      this.props.notify(`Welcome, ${user.username}!`, 5)
      this.setState({ username: '', password: '', user })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)


    } catch (err) {
      console.log(err)
      this.setState({ error: 'Käyttäjätunnus tahi salasana onpi virheellinen' })
      setTimeout(() => { this.setState({ error: '' }) }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleLoginVisibility = () => {

    this.setState({ loginVisible: !this.state.loginVisible })

  }

  logout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    this.setState({ user: null, username: '', password: '' })
  }

  onBlogInputChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }


  onBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title: this.state.blogtitle,
      author: this.state.blogauthor,
      url: this.state.blogurl
    }

    try {
      const result = await blogService.createBlogPost(blog)

      let moddedRes = result
      moddedRes.user = this.state.user
      this.setState({
        blogs: this.state.blogs.concat(result),
        blogtitle: '',
        blogurl: '',
        blogauthor: ''
      }, () => { this.props.notify(`Added blog with title ${result.title} from author ${result.author}`, 5) })

    } catch (err) {
      console.log(err)
      this.setState({ error: "bad request..." })
      setTimeout(() => { this.setState({ error: null }) }, 5000)
    }

  }

  componentDidMount = async () => {
    await this.props.initializeUsers()
    console.log('this.props: ',this.props)
    /*blogService.getAll().then(blogs => {
    his.setState({ blogs })
    }
    )*/

    const userJSON = window.localStorage.getItem('loggedUser')
    console.log("userJSON: ", userJSON)

    if (userJSON && userJSON !== 'undefined') {
      let user = JSON.parse(userJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  render() {


    console.log('user: ', this.state.user)

    if (this.state.user === null) {
      return (
        <div>

          <h3 className="error">{this.state.error}</h3>
          <Notification />
          <Togglable buttonText="Login">
            <Login login={this.login} handleLoginFieldChange={this.handleLoginFieldChange} state={this.state} visible={this.state.visible} />
          </Togglable>
        </div>
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <button onClick={this.logout}>logout</button>
          <h3 className="error">{this.state.error}</h3>
          <Notification />
          <Router>
            <div>
              <Route exact path="/" render={() => {
                return (
                  <div>
                    <Togglable buttonText="Submit new post">
                      <BlogForm state={this.state} blogInputChangeHandler={this.onBlogInputChange} onBlogSubmit={this.onBlogSubmit} />
                    </Togglable>

                    <h3>Previous blogs: </h3>
                    {this.state.blogs.sort((a, b) => { return b.likes - a.likes }).map(blog =>
                      <Blog key={blog.id.concat(Date.now().toString)} handleDelete={this.deleteHandler} user={this.state.user} blog={blog} />
                    )}
                  </div>)
              }} />
              <Route exact path="/users" render={() => <UserList  />} />
              <Route exact path="/users/:id" render={() => <div></div>} />


            </div>
          </Router>

        </div>
      );
    }
  }
}

// ADD REDUCER OR SOMETHING HERE
const mapDispatchToProps = {
  notify,
  initializeUsers
}
export default connect(null, {notify, initializeUsers})(App)
