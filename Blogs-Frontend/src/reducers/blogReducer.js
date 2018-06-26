import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'CREATE_BLOG':
            return store.concat(action.blog)
        case 'UPDATE_BLOG':
            const old = store.findIndex(b => b.id === action.blogToUpdate.id)
            if (old === -1) {
                return store
            } else {
                let updated = store
                updated.splice(old, 1, action.blogToUpdate)
                console.log("updated: ", updated)
                return updated
            }
        default:
            return store
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
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

export const updateBlog = (blogToUpdate) => {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_BLOG',
            blogToUpdate
        })
    }
}

export default blogReducer