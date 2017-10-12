import {API, headers } from '../utils/api'


export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const RECIEVE_CATEGORY_POSTS = 'RECIEVE_CATEGORY_POSTS'

export const recieveAllPosts = (allPosts) => ({
	type: RECIEVE_POSTS,
	allPosts
})

export const recieveCategoryPosts = (categoryPosts) => ({
	type: RECIEVE_CATEGORY_POSTS,
	categoryPosts
})

export const getAllPosts = () => dispatch => {
  return fetch(`${API}/posts`, { headers })
    .then(res => res.json())
    .then(data => dispatch(recieveAllPosts(data)))
}

export const getCategoryPosts = (category) => dispatch => {
  return fetch(`${API}`+`${category}/posts`, { headers })  
    .then(res => res.json())
    .then(data => dispatch(recieveCategoryPosts(data)))
}

