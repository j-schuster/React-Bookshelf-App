import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
		comments: [comments],
		posts: posts.posts
	}
}

const mapDispatchToProps = dispatch => ({
  getPostsAll: () => dispatch(getAllPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
