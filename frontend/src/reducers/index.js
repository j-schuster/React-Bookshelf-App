import { RECIEVE_CATEGORIES } from '../actions/categoryActions'
import { RECIEVE_POSTS, RECIEVE_CATEGORY_POSTS } from '../actions/postActions'
import { combineReducers } from 'redux'


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
		const allPosts = action.allPosts
			return allPosts

		default :
			return state
	}
}

function categoryPosts(state=[], action) {
	switch(action.type){
		case RECIEVE_CATEGORY_POSTS:
		const categoryPosts = action.categoryPosts
			return categoryPosts	
			default :
				return state
	}
}


const rootReducer = combineReducers({
	categories,
	posts,
	categoryPosts
})

export default rootReducer


