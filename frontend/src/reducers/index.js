import { RECIEVE_CATEGORIES } from '../actions/categoryActions'
import { combineReducers } from 'redux'
import { RECIEVE_POSTS,
		 RECIEVE_CATEGORY_POSTS,
		 RECIEVE_POST_DETAILS,
		 RECIEVE_COMMENTS,
		 ADD_NEW_POST,
		 DELETE_POST,
		 ADD_NEW_COMMENT,
		 DELETE_COMMENT,
		 EDIT_POST
		 } from '../actions/postActions'


function categories(state=[], action) {
	switch(action.type){
		case RECIEVE_CATEGORIES:
		const categories = action.data.categories.map((cat) => cat)
     		return categories
      	default:
      		return state	
	} 
}

function posts(state=[], action) {
	switch(action.type){
		case RECIEVE_POSTS:
		const posts = action.posts
			return posts
		case ADD_NEW_POST:
			return [...state, action.post]
		case DELETE_POST:
			return [...state]
		default:
			return state
	}
}

function categoryPosts(state=[], action) {
	switch(action.type){
		case RECIEVE_CATEGORY_POSTS:
		const categoryPosts = action.categoryPosts
			return categoryPosts	
		default:
			return state
	}
}

function postDetails(state={}, action) {
	switch(action.type){
		case RECIEVE_POST_DETAILS:
		const { post, comments } = action
			return {
				...state,
				post:[post], 
				comments:comments
			}
		case ADD_NEW_COMMENT:
			return {
				...state,
				comments:[...state.comments, action.comment]
			}
		case DELETE_COMMENT:
		const target = state.comments.findIndex((comment) => comment.id === action.id)
			return {
				...state,
				comments: [
					...state.comments.slice(0, target),
					...state.comments.slice(target + 1)
					] 
			}
		case EDIT_POST:
		const editedPost = Object.assign(state.post[0], action.post)		
			return {
				...state, 
				post: [editedPost]
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
})

export default rootReducer


