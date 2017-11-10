import { fetchAllPosts,
         fetchPostDetails,
         fetchComments,
         addNewPost,
         deletePost,
         addComment,
         deleteComment,
         editPost,
         editComment,
         votePost,
         voteComment } from '../utils/api'

import { RECIEVE_POSTS,
         RECIEVE_POST_DETAILS,
         RECIEVE_CATEGORY_POSTS,
         RECIEVE_COMMENTS,
         ADD_NEW_POST,
         DELETE_POST,
         ADD_NEW_COMMENT,
         DELETE_COMMENT,
         EDIT_POST,
         EDIT_COMMENT,
         UP_VOTE,
         DOWN_VOTE,
         UP_VOTE_PI,
         DOWN_VOTE_PI,
         UP_VOTE_COMMENT,
         DOWN_VOTE_COMMENT,
         EDIT_POST_IN_POSTS  } from './actionTypes'


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

export const addPost = (post) => dispatch => {
  addNewPost(post)
  .then(NewPost => {
    dispatch({
      type: ADD_NEW_POST,
      post
    })
  })
}

export const addNewComment = (comment) => dispatch => {
  addComment(comment)
  .then(newComment => dispatch({
    type: ADD_NEW_COMMENT,
    comment
  }))
}

export const removeComment = (id) => dispatch => {
  deleteComment(id)
  .then(() => {
    dispatch({
     type: DELETE_COMMENT,
     id
   })
 })
}

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


export const removePost = (id) => dispatch => {
  deletePost(id)
  .then(() => {
    dispatch({
      type: DELETE_POST,
      id
    })
  })
}

export const modifyPost = (id, post) => dispatch => {
  editPost(id, post)
  .then(() => {
    dispatch({
      type: EDIT_POST,
      id,
      post
    })
  })
}

export const modifyPostInPosts = (id, post) => dispatch => {
  editPost(id, post)
  .then(() => {
    dispatch({
      type: EDIT_POST_IN_POSTS,
      id,
      post
    })
  })
}

export const modifyComment = (id, comment) => dispatch => {
  editComment(id, comment)
  .then(() => {
    dispatch({
      type: EDIT_COMMENT,
      id,
      comment
    })
  })
}

export const upVote = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: UP_VOTE,
      id,
      action
    })
  })
}

export const downVote = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: DOWN_VOTE,
      id,
      action
    })
  })
}

// vote on post info page because of having two reducers 
export const upVotePI = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: UP_VOTE_PI,
      id,
      action
    })
  })
}

export const downVotePI = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: DOWN_VOTE_PI,
      id,
      action
    })
  })
}

export const commentUpVote = (id, action) => dispatch => {
  voteComment(id, action)
  .then(() => {
    dispatch({
      type: UP_VOTE_COMMENT,
      id,
      action
    })
  })
}

export const commentDnVote = (id, action) => dispatch => {
  voteComment(id, action)
  .then(() => {
    dispatch({
      type: DOWN_VOTE_COMMENT,
      id,
      action
    })
  })
}