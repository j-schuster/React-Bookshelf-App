import React from 'react'
import { connect } from 'react-redux'
import UpIcon from 'react-icons/lib/fa/angle-up'
import DownIcon from 'react-icons/lib/fa/angle-down'
import { getCategoryPosts } from '../actions/postActions'

class Post extends React.Component {
	
	componentDidMount(){
		const category = window.location.pathname
		this.props.catPosts(category)
	}

	render(){
		const posts = this.props.categoryPosts
		//console.log(this.props.categoryPosts)
		return(
			 <div className="list-group posts-main">
  				{posts.map((post) => 
  				 <div key={post.id}>	
  				   <h3 className="list-group-item active">Title: {post.title}</h3>
  				   <p className="list-group-item">Body: {post.body}</p>
  				   <p className="list-group-item">Author: {post.author}</p>
  				   <p className="list-group-item">Category: {post.category}</p>
  				   <p className="list-group-item">Votescore: <UpIcon/> {post.voteScore} <DownIcon/></p>
  				 </div>  
  				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		categoryPosts : state.categoryPosts
	}
}

const mapDispatchToProps = dispatch => ({
  catPosts: (category) => dispatch(getCategoryPosts(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)