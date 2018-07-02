import React from 'react'
import { updateComment } from '../reducers/newCommentReducer'
import { connect } from 'react-redux'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

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
        <Form onSubmit={this.submitComment}>
          <FormGroup>
            <FormControl type='text' value={this.props.newComment} onChange={(e => { this.props.updateComment(e.target.value) })}></FormControl>
            <Button type="submit">Submit Comment</Button>
          </FormGroup>
        </Form>
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