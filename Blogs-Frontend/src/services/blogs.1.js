import axios from 'axios'
//import { bindActionCreators } from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  console.log('setting token...', newToken)
  token = `bearer ${newToken}`
  console.log('token set: ', token)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlogPost = async (blogPost) => {
  console.log('creating...', token)
  const config = {
    headers: { 'authorization': token }
  }

  console.log('config: ', config)
  const response = await axios.post(baseUrl, blogPost, config)
  return response.data
}


const updateBlogPost = async (blogPost) => {
  console.log('updating...')

  const config = {
    headers: { 'authorization': token }
  }

  const response = await axios.put(`${baseUrl}/${blogPost.id}`, blogPost, config)
  return response.data

}

const removeBlogPost = async (id) => {
  console.log('Deleting blog post ', id)

  const config = {
    headers: { 'authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addCommentToPost = async (id, comment) => {
  console.log('comment: ', comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  console.log('response: ', response)
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

export default { getAll, setToken, createBlogPost, updateBlogPost, removeBlogPost, addCommentToPost, getComments }