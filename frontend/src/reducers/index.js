import { RECIEVE_CATEGORIES } from '../actions/categoryActions'
import { combineReducers } from 'redux'
import { RECIEVE_POSTS,
		 RECIEVE_CATEGORY_POSTS,
		 RECIEVE_POST_DETAILS,
		 RECIEVE_COMMENTS,
		 ADD_NEW_POST
		 } from '../actions/postActions'


function categories(state=[], action) {
	switch(action.type){
			case RECIEVE_CATEGORIES :
			const categories = action.data.categories.map((cat) => cat)
      			return categories
      		default :
      			return state	
		} 
}

function posts(state=[], action) {
	switch(action.type){
		case RECIEVE_POSTS:
		const posts = action.posts
			return posts
		case ADD_NEW_POST:
		console.log(action)
			return [...state, action.post]
		default :
			return state
	}
}
/*
function newPosts(state=[], action) {
	switch(action.type){
		case ADD_NEW_POST:
		return action.newPost
		default :
			return state
	}
}
*/
function categoryPosts(state=[], action) {
	switch(action.type){
		case RECIEVE_CATEGORY_POSTS:
		const categoryPosts = action.categoryPosts
			return categoryPosts	
			default :
				return state
	}
}

function postDetails(state=[], action) {
	switch(action.type){
		case RECIEVE_POST_DETAILS:
			const postDetails = action.post
			const comments = action.comments
			return {
				...state,
				post:[postDetails], 
				comments:comments
			}
				default:
					return state
	}
}

function comments(state={}, action) {
	switch(action.type){
		case RECIEVE_COMMENTS:
		 const { comments, postId } = action
			return  {...state, 
				[postId]: comments
			}

		default :
			return state
	}
}


const rootReducer = combineReducers({
	categories,
	posts,
	categoryPosts,
	postDetails,
	comments,
	//newPosts
})

export default rootReducer


