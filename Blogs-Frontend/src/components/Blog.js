import React from 'react'
import { updateComment } from '../reducers/newCommentReducer'
import { connect } from 'react-redux'

//const Blog = ({ blog, addNewComment }) => {
class Blog extends React.Component {
  constructor(props) {
    super(props)
  }

  submitComment = async (e) => {
    e.preventDefault()
    await this.props.addNewComment(this.props.blog.id)
    this.render()
  }

  render() {
    console.log('Rendered')
    const blog = this.props.blog
    if (!blog) {
      return <h4>No such blog found...</h4>
    }
    return (
      <div>
        <h3>{blog.title}</h3>
        <p>Author: {blog.author}</p>
        <p>Address: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes}</p>
        <p>Submitted by {!blog.user ? 'Unknown' : blog.user.name}</p>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map(c => { return (<li key={c.concat(Math.floor(Math.random() * 10000))}>{c}</li>) })}
        </ul>
        <h5>Add new comment</h5>
        <form onSubmit={this.submitComment}>
          <input type='text' value={this.props.newComment} onChange={(e => { this.props.updateComment(e.target.value) })}></input>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    newComment: store.newComment
  }
}

const mapDispatchToProps = {
  updateComment,
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default connectedBlog