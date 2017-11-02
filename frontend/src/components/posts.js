import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import { getCategoryPosts } from '../actions/postActions'
import { getAllPosts } from '../actions/postActions'
import PostView from './postView'

class Post extends React.Component {

	constructor(){
		super();
		this.state = {
			posts: ''
		}
	}
	
	componentDidMount(){
		//const category = window.location.pathname
		//this.props.catPosts(category)
		this.props.getPostsAll()
	}

	componentWillReceiveProps(posts){
		const categoryName = window.location.pathname
		const name = categoryName.slice(1)
		const data = posts.posts
		if(data){
			const filtered = data.filter((post) => post.category === name)
			this.setState({ posts: filtered })
		}

	}


	render(){
		const categoryPosts = this.state.posts
		const { comments } = this.props
		return(
	 	<div>
	 		<Link to='/'>
	 			<div className="navbar"><h1>Readable</h1></div>
	 		</Link>
			<PostView posts={categoryPosts} comments={comments}/>
		</div>
		);
	}
}

const mapStateToProps = state => {
	const { comments, posts } = state
	

	return {
		//categoryPosts : categoryPosts,
		comments: [comments],
		posts: posts.posts
	}
}

const mapDispatchToProps = dispatch => ({
  //catPosts: (category) => dispatch(getCategoryPosts(category)),
  getPostsAll: () => dispatch(getAllPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
