import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import { resetLoginInfo } from './reducers/loginInfoReducer'
import User from './components/User'
import { continueSession, initializeUser, logout } from './reducers/loggedInUserReducer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    console.log("logging out...")
    this.props.logout()
    console.log("Store after logout: ", this.props)
    //this.props.history.push("/")
  }

  onBlogInputChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
    console.log(`${[event.target.name]}: ${event.target.value}`)
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
      console.log("Result of blog post creation: ", result)

      let moddedRes = result
      moddedRes.user = this.state.user

      await this.props.createNewBlog(result)
      this.setState({
        // blogs: this.state.blogs.concat(result),
        blogtitle: '',
        blogurl: '',
        blogauthor: ''
      }, () => { this.props.notify(`Added blog with title ${result.title} from author ${result.author}`, 5) })

    } catch (err) {
      console.log(err)
      this.props.notify(`Bar request; something is wrong with your blog, dude`, 5)
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
    await this.props.resetLoginInfo()
    if (this.props.user) {
      await blogService.setToken(this.props.user.token)
    }

    console.log("after init: ", this.props)

    const userJSON = window.localStorage.getItem('loggedUser')
    console.log("loggedUser: ", userJSON)
    console.log("after componentDidMount: ", this.props)
  }

  render() {

    console.log('user: ', this.props.user)

    return (
      <Router>
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            <Route exact path="/" render={({ history }) => {
              if (this.props.user && this.props.user.token) {
                return (
                  <div>
                    <div>
                      <Link to="/">Home</Link> &nbsp;
                      <Link to="/users">Users</Link> &nbsp;
                      <span><em>{this.props.user.username} logged in</em></span> &nbsp;
                      <button onClick={this.logout}>logout</button> &nbsp;
                    </div>
                    <Togglable buttonText={`Create new Blog Post (Fake news)`}>
                      <BlogForm state={this.state} blogInputChangeHandler={this.onBlogInputChange} onBlogSubmit={this.onBlogSubmit} />
                    </Togglable>
                    <h3>Previous blogs: </h3>
                    {this.props.blogs.sort((a, b) => { return b.likes - a.likes }).map(blog =>
                      <h3 key={blog.id} className="blogLink"><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                    )}
                  </div>)
              } else {
                return (
                  <div>
                    <Link to="/">Home</Link> &nbsp;
                    <Link to="/users">Users</Link> &nbsp;
                    <span><em>User not logged in</em></span> &nbsp;

                    <Togglable buttonText={`LOGin`}>
                      <Login history={history} />
                    </Togglable>
                  </div>
                )
              }
            }} />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) => <User user={this.userById(match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={this.blogById(match.params.id)} />} />
          </div>
        </div>
      </Router>

    )
  }
}


const mapStateToProps = (store) => {
  return {
    users: store.users,
    blogs: store.blogs,
    user: store.user
  }
}

const mapDispatchToProps = {
  notify,
  initializeUsers,
  initializeBlogs,
  resetLoginInfo,
  continueSession,
  initializeUser,
  logout,
  createNewBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
