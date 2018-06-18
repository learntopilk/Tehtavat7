import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      token: null,
      error: '',
      message: '',
      user: null,
      blogtitle: '',
      blogauthor: '',
      blogurl: '',
      loginVisible: false

    }

    this.deleteHandler = (id) => {
      console.log(id)
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
    console.log('logging in')

    try {
      const userObj = { username: this.state.username, password: this.state.password }
      const user = await loginService.login(userObj)

      console.log("user from POST:", user)

      this.setMessageWithTimeOut(`Welcome, ${user.username}!`)
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
    console.log("1 ", event.target.value, " ", event.target.name)
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

  setMessageWithTimeOut = (message) => {
    this.setState({ message }, () => {
      setTimeout(() => { this.setState({ message: null }) }, 5000)
    })
  }

  onBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title: this.state.blogtitle,
      author: this.state.blogauthor,
      url: this.state.blogurl
    }

    console.log("post to be made: ", blog)

    try {
      const result = await blogService.createBlogPost(blog)

      // Add real user info instead of simple ID
      let moddedRes = result
      moddedRes.user = this.state.user
      this.setState({
        blogs: this.state.blogs.concat(result),
        blogtitle: '',
        blogurl: '',
        blogauthor: ''
      }, () => {this.setMessageWithTimeOut(`Added blog with title ${result.title} from author ${result.author}`)})
      
    } catch (err) {
      console.log(err)
      this.setState({ error: "bad request..." })
      setTimeout(() => { this.setState({ error: null }) }, 5000)
    }

  }

  componentDidMount() {
    console.log('getting blogs...')
    blogService.getAll().then(blogs => {
      this.setState({ blogs })
      console.log(blogs)
    }
    )

    const userJSON = window.localStorage.getItem('loggedUser')
    console.log("userJSON: ", userJSON)

    if (userJSON && userJSON !== 'undefined') {
      let user = JSON.parse(userJSON)
      this.setState({ user })
      console.log("found token: ", user.token)
      blogService.setToken(user.token)
      console.log('updated Token')
    }
  }

  render() {


    console.log('user: ', this.state.user)

    if (this.state.user === null) {
      return (
        <div>
          <h3 className="error">{this.state.error}</h3>
          <h3 className="message">{this.state.message}</h3>
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
          <h3 className="message">{this.state.message}</h3>
          <Togglable buttonText="Submit new post">
            <BlogForm state={this.state} blogInputChangeHandler={this.onBlogInputChange} onBlogSubmit={this.onBlogSubmit} />
          </Togglable>
          <h3>Previous blogs: </h3>
          {this.state.blogs.sort((a, b) => { return b.likes - a.likes }).map(blog =>
            <Blog key={blog.id.concat(Date.now().toString)} handleDelete={this.deleteHandler} user={this.state.user} blog={blog} />
          )}

        </div>
      );
    }
  }
}

export default App;
