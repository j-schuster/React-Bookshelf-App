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
		 EDIT_POST,
		 EDIT_COMMENT,
		 UP_VOTE,
		 DOWN_VOTE,
		 UP_VOTE_PI,
		 DOWN_VOTE_PI,
		 UP_VOTE_COMMENT,
		 DOWN_VOTE_COMMENT
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

function posts(state = [], action) {
	switch(action.type){
		case RECIEVE_POSTS:
		const posts = action.posts
		
			return {
				...state,
				posts: posts
			}

		case ADD_NEW_POST:
			return [...state, action.post]
		case DELETE_POST:
			return [...state]

		case UP_VOTE:		
		const postsAll = [...state.posts]
		const targetUp = postsAll.findIndex(post => post.id === action.id)
			  postsAll[targetUp].voteScore = postsAll[targetUp].voteScore + 1
			return { 
				...state,
				 posts: [...postsAll]
				}

		case DOWN_VOTE:		
		const postsToEdit = [...state.posts]
		const targetDown = postsToEdit.findIndex(post => post.id === action.id)
			  postsToEdit[targetDown].voteScore = postsToEdit[targetDown].voteScore - 1
			return { 
				...state,
				 posts: [...postsToEdit]
				}						
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
		case EDIT_COMMENT:
		const commentList = [...state.comments]
		const targetComment = commentList.findIndex(comment => comment.id === action.id)
		const editedComment = Object.assign({}, commentList[targetComment], action.comment)			
			return {
				...state,
				comments: [...commentList.slice(0, targetComment), editedComment,
						   ...commentList.slice(targetComment + 1)
						]
					}	

		case UP_VOTE_PI:		
		const postToUp = [...state.post]		
			  postToUp[0].voteScore = postToUp[0].voteScore + 1
			return { 
				...state,
				 post: [...postToUp]
				}

		case DOWN_VOTE_PI:		
		const postToDown = [...state.post]
			  postToDown[0].voteScore = postToDown[0].voteScore - 1			  
			return { 
				...state,
				 post: [...postToDown]
				}	

		case UP_VOTE_COMMENT:
		// copy all comments 
		const comToEdit = [...state.comments]
		// find index	
		const targetComUp = comToEdit.findIndex(comment => comment.id === action.id)
		// change the voteScore of that comment
		comToEdit[targetComUp].voteScore = comToEdit[targetComUp].voteScore + 1
			return {
				...state,
				comments: [...comToEdit]
			}
		case DOWN_VOTE_COMMENT:
		const comsToEdit = [...state.comments]
		// find index	
		const targetComDn = comsToEdit.findIndex(comment => comment.id === action.id)
		// change the voteScore of that comment
		comsToEdit[targetComDn].voteScore = comsToEdit[targetComDn].voteScore - 1
			return {
				...state,
				comments: [...comsToEdit]
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


