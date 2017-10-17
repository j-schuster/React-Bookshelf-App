import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { getAllPosts, addPost } from '../actions/postActions'
import PostView from './postView'


class MainPage extends React.Component {
		
	componentDidMount(){		
		this.props.allPosts()
	}

	 getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 return hey.map(x => x[postId].length)
	}

	doSomething = () =>{

		const info = {
			id: '8ljvkhgvrvrvcsftffd',
			title: "This is the last one for real",
			body: 'this is aking forever, which is why I want to move on'
		}

		this.props.addNewPost(info)
		this.props.allPosts()
	}
	

render() {
	
	return(
		<div>
			<div className="navbar"><h1>Readable</h1></div>
			<Categories/>
			<PostView posts={this.props.posts} comments={this.props.comments}/>
			<button onClick={this.doSomething}>SEND</button>
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
  allPosts: () => dispatch(getAllPosts()),
  addNewPost: (info) => dispatch(addPost(info))
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
