import React from 'react'
import { connect } from 'react-redux'
import { getCategoryPosts } from '../actions/postActions'
import PostView from './postView'

class Post extends React.Component {
	
	componentDidMount(){
		const category = window.location.pathname
		this.props.catPosts(category)
	}

	render(){
		const { categoryPosts, comments } = this.props
		return(
	 	<div>
	 		<div className="navbar"><h1>Readable</h1></div>
			<PostView posts={categoryPosts} comments={comments}/>
		</div>
		);
	}
}

const mapStateToProps = state => {
	const { comments, categoryPosts } = state

	return {
		categoryPosts : categoryPosts,
		comments: [comments]
	}
}

const mapDispatchToProps = dispatch => ({
  catPosts: (category) => dispatch(getCategoryPosts(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
