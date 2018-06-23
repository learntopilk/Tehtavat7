import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { resetLoginInfo } from './reducers/loginInfoReducer'
import User from './components/User'
import loggedInUserReducer, { continueSession, initializeUser, logout } from './reducers/loggedInUserReducer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //blogs: [],
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
      /*
      let blogsToUpdate = []
      for (let i = 0; i < this.state.blogs.length; i++) {
        if (this.state.blogs[i].id === id) {
        } else {
          blogsToUpdate.push(this.state.blogs[i])
        }
      }
      this.setState({ blogs: blogsToUpdate })
      */
    }



  }

  toggleLoginVisibility = () => {

    this.setState({ loginVisible: !this.state.loginVisible })

  }

  logout = () => {
    blogService.setToken(null)
    this.props.logout()
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

  userById = (id) => {
    return this.props.users.find(u => u.id === id)
  }

  blogById = (id) => {
    return this.props.blogs.find(b => b.id === id)
  }

  componentDidMount = async () => {
    await this.props.initializeUsers()
    await this.props.initializeBlogs()
    await this.props.initializeUser()
    this.props.resetLoginInfo()
    console.log("after init: ", this.props)

    const userJSON = window.localStorage.getItem('loggedUser')
    console.log("loggedUser: ", userJSON)

    /*
    if (userJSON && userJSON !== 'undefined' && (userJSON !== null)) {
      let user = JSON.parse(userJSON)
      if (user === null) {
        return
      } else {
        //this.setState({ user })
        console.log("user at token retrieval: ", user)
        await continueSession(user)
        blogService.setToken(user.token)
      }
  }*/

    console.log("after componentDidMount: ", this.props)
  }

  render() {


    console.log('user: ', this.props.user)

    /*    if (this.state.user === null) {
          return (
            <Router>
              <div>
                <div>
                  <Link to="/">Home</Link> &nbsp;
                <Link to="/users">Users</Link>
                </div>
    
                <h3>Sign-in</h3>
    
                <h3 className="error">{this.state.error}</h3>
                <Route exact path="/" render={({ history }) => {
                  return (
                    <div>
                      <Notification />
                      <Togglable buttonText="Login">
                        <Login history={history} visible={this.state.visible} />
                      </Togglable>
                    </div>
                  )
                }} />
                <Route exact path="/r" render={({ history }) => {
                  return (
                    <div>Rubal
                    </div>
                  )
                }} />
    
    
              </div>
            </Router>
    
          )
        } else {*/
    return (
      <Router>
        <div>
          <div>
            <Link to="/">Home</Link> &nbsp;
            <Link to="/users">Users</Link>
          </div>
          <h2>blogs</h2>
          <h3 className="error">{this.state.error}</h3>
          <Notification />
          <div>
            <Route exact path="/" render={({ history }) => {
              if (this.props.user === null || this.props.user.username === "") {
                return (
                  <div>
                    <Notification />
                    <Togglable buttonText="Login">
                      <Login history={history} visible={this.state.visible} />
                    </Togglable>
                  </div>
                )
              } else {
                return (
                  <div>
                    <button onClick={this.logout}>logout</button>
                    <Togglable buttonText="Submit new post">
                      <BlogForm state={this.state} blogInputChangeHandler={this.onBlogInputChange} onBlogSubmit={this.onBlogSubmit} />
                    </Togglable>
                    <h3>Previous blogs: </h3>
                    {this.props.blogs.sort((a, b) => { return b.likes - a.likes }).map(blog =>
                      <h3 key={blog.id} className="blogLink"><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                    )}
                  </div>)
              }
            }} />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) => <User user={this.userById(match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={this.blogById(match.params.id)} />} />
          </div>
        </div>
      </Router>

    )
    //   }
  }
}

/*
Dumped old blog key for safety:
<Blog key={blog.id.concat(Date.now().toString)} handleDelete={this.deleteHandler} user={this.state.user} blog={blog} />

      */

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs,
    user: state.user

  }
}

export default connect(mapStateToProps, { notify, initializeUsers, initializeBlogs, resetLoginInfo, continueSession, initializeUser, logout })(App)
