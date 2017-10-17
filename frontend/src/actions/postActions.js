import { fetchAllPosts, fetchCategoryPosts, fetchPostDetails, fetchComments, addNewPost } from '../utils/api'


export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const RECIEVE_CATEGORY_POSTS = 'RECIEVE_CATEGORY_POSTS'
export const RECIEVE_POST_DETAILS = 'RECIEVE_POST_DETAILS'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
//change allPosts to posts
export const recieveAllPosts = (posts, postId) => ({
	type: RECIEVE_POSTS,
	posts
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
// posts POST
export const addPost = (post) => dispatch => {
  addNewPost(post)
  .then(NewPost => {
    dispatch({
      type: ADD_NEW_POST,
      post
    })
  })
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









