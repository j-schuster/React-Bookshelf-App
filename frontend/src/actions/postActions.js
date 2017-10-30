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


export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const RECIEVE_CATEGORY_POSTS = 'RECIEVE_CATEGORY_POSTS'
export const RECIEVE_POST_DETAILS = 'RECIEVE_POST_DETAILS'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const UP_VOTE_PI ='UP_VOTE_PI'
export const DOWN_VOTE_PI = 'DOWN_VOTE_PI'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'


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

/*export const getCategoryPosts = (category) => dispatch => {
  fetchCategoryPosts(category)
  .then(data => dispatch(recieveCategoryPosts(data)))
}*/

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
export const addNewComment = (comment) => dispatch => {
  addComment(comment)
  .then(newComment => dispatch({
    type: ADD_NEW_COMMENT,
    comment
  }))
}

// delete comments 
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

