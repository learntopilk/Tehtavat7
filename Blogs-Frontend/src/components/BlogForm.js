//BlogForm.js

import React from 'react'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

const BlogForm = ({ state, onBlogSubmit, blogInputChangeHandler }) => {
  return (
    <div>
      <h4>Submit new blog post:</h4>
      <Form onSubmit={onBlogSubmit}>
        <FormGroup>
          <div>Title: <FormControl name="blogtitle" value={state.blogtitle} onChange={blogInputChangeHandler} type="text" /></div>
          <div>Author: <FormControl name="blogauthor" value={state.blogauthor} onChange={blogInputChangeHandler} type="text" /></div>
          <div>Url: <FormControl name="blogurl" value={state.blogurl} onChange={blogInputChangeHandler} type="text" /></div>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
      <br />
    </div>
  )
}

export default BlogForm
