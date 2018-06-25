//BlogForm.js

import React from 'react'

const BlogForm = ({ state, onBlogSubmit, blogInputChangeHandler }) => {
    return (
        <div>
            <h4>Submit new blog post:</h4>
            <form onSubmit={onBlogSubmit}>
               <div>Title: <input name="blogtitle" value={state.blogtitle} onChange={blogInputChangeHandler} type="text"/></div>
                <div>Author: <input name="blogauthor" value={state.blogauthor} onChange={blogInputChangeHandler} type="text"/></div>
                <div>Url: <input name="blogurl" value={state.blogurl} onChange={blogInputChangeHandler} type="text"/></div>
                <button type="submit">Submit</button>
            </form>
            <br />
        </div>
    )
}

export default BlogForm
