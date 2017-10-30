import { fetchAllCategories, votePost } from '../utils/api'


export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const POST_UP_VOTE = 'POST_UP_VOTE'
export const POST_DOWN_VOTE = 'POST_DOWN_VOTE'

export const recieveCategories = (data) => ({
	type: RECIEVE_CATEGORIES,
	data
})


export const getAllCategories = () => dispatch => {
  	fetchAllCategories()
  	.then(data => dispatch(recieveCategories(data)))
}


export const postUpVote = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: POST_UP_VOTE,
      id,
      action
    })
  })
}

export const postDownVote = (id, action) => dispatch => {
  votePost(id, action)
  .then(() => {
    dispatch({
      type: POST_DOWN_VOTE,
      id,
      action
    })
  })
}