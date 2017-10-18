import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../actions/postActions'
import PostView from './postView'
import AddIcon from 'react-icons/lib/fa/plus-circle'


class MainPage extends React.Component {
		
	componentDidMount(){		
		this.props.allPosts()
	}

	 getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 	return hey.map(x => x[postId].length)
	}
	

render() {
	
	
	return(
		<div>
			<div className="navbar"><h1>Readable</h1></div>
			<Categories/>
			 <PostView posts={this.props.posts} comments={this.props.comments}/>			
			<Link to='/new/post'>
			 <div className="add-icon"><AddIcon/></div>
			 </Link>
		</div>
		);	
	}
} 

const mapStateToProps = state => {
	const { comments, posts } = state
	
	return {
		posts : posts,
		comments : [comments]
	}
}

const mapDispatchToProps = dispatch => ({
  allPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

/*

	doSomething(){

		const info = {
			id: '8848484848',
			title: "I love peanut-butter",
			body: 'this is the bod of my new post'
		}

		this.props.addNewPost(info)
	}

	<div className="navbar"><h1>Readable</h1></div>
*/
