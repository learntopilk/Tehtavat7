import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: props.blog,
      owner: props.blog.user,
      current: props.user,
      deleteHandler: props.handleDelete
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleClick = async (e) => {
    e.preventDefault()

    const b = this.state.blog
    b.likes = this.state.blog.likes + 1

    console.log("b: ", b)

    const result = await blogService.updateBlogPost(b)
    console.log("result: ", result)
    this.setState({ blog: result }, () => { console.log("updated!") })

  }

  remove = async (e) => {
    if (window.confirm('Do you want to remove this blog post?')) {
      e.preventDefault()
      console.log("Deleting ", this.state.blog.id)

      const res = await blogService.removeBlogPost(this.state.blog.id)
      console.log('res: ', res)

      this.state.deleteHandler(this.state.blog.id)
    }

  }



  render() {

    const stil = {
      'paddingLeft': '10px',
      border: '2px solid black',
      'borderRadius': '4px',
      margin: '5px'
    }

    console.log('owner: ', this.state.owner, 'current: ', this.state.current)
    const showIfOwnedByUser = { display: ((this.state.owner === null || this.state.owner === undefined || this.state.owner.username === this.state.current.username) && this.state.visible) ? '' : 'none' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    return (
      <div style={stil} className='blogpost'>

        <h5 onClick={this.toggleVisibility} className='toggleButton'>{this.state.blog.title}</h5>
        <p style={showWhenVisible}>Author: {this.state.blog.author}</p>
        <div style={showWhenVisible} className='togglableItem'>
          <p style={showWhenVisible}>Address: {this.state.blog.url}</p>
          <div style={showWhenVisible}><span>Likes: {this.state.blog.likes}</span><button onClick={this.handleClick}>like</button></div>
          <button style={showIfOwnedByUser} onClick={this.remove}>Delete this</button>
        </div>


      </div>


    )
  }


}

export default Blog