import { fetchAllPosts, fetchCategoryPosts, fetchPostDetails, fetchComments } from '../utils/api'


export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const RECIEVE_CATEGORY_POSTS = 'RECIEVE_CATEGORY_POSTS'
export const RECIEVE_POST_DETAILS = 'RECIEVE_POST_DETAILS'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'

export const recieveAllPosts = (allPosts, postId) => ({
	type: RECIEVE_POSTS,
	allPosts
})

export const recieveCategoryPosts = (categoryPosts) => ({
	type: RECIEVE_CATEGORY_POSTS,
	categoryPosts
})

export const recievePostDetails = (postDetails) => ({
  type: RECIEVE_POST_DETAILS,
  postDetails
})

export const recieveComments = (comments, postId) => ({
  type: RECIEVE_COMMENTS,
  comments,
  postId
})

export const getAllPosts = () => dispatch => {
  fetchAllPosts()
   .then(data => {
    dispatch(recieveAllPosts(data)) 
     data.map(post =>  
      dispatch(getComments(post.id)))
    })
  }

export const getCategoryPosts = (category) => dispatch => {
  fetchCategoryPosts(category)
  .then(data => dispatch(recieveCategoryPosts(data)))
}
// COMMENTS
export const getComments = (id) => dispatch => {
   fetchComments(id)
   .then(data => dispatch(recieveComments(data, id)))
}

export const getPostDetails = (id) => dispatch => {
  fetchPostDetails(id)
  .then(post => {
    fetchComments(post.id)
    .then(comments => {
      dispatch({
        type: RECIEVE_POST_DETAILS,
        post,
        comments
      })
    })
  })
}



/*
dispatch(recieveComments(data))
{
export const getAllPosts = () => dispatch => {
  fetchAllPosts()
  .then(data => data.map(post => {
    fetchComments(post.id)
    .then(comments => {
        dispatch({
        type: RECIEVE_POSTS,
        data,
        comments
      })
    })
  }))
}
*/









