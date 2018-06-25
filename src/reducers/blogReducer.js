import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'CREATE_BLOG':
            return store.concat(action.blog)
        default:
            return store
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        console.log("blogs at initializeBlogs: ", blogs)
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

export const createNewBlog = (blog) => {
    return async (dispatch) => {
        dispatch({
            type: 'CREATE_BLOG',
            blog
        })
    }
}

export default blogReducer