import React from 'react'

const Blog = ({ blog }) => {
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
      { blog.comments.map(c => { return(<li>{c}</li>) }) }
      </ul>
    </div>
  )
}

export default Blog