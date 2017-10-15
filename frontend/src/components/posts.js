import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
		
		return(
	 	<div>
	 	<div className="navbar"><h1>MAIN PAGE</h1></div>
			 <div className="list-group posts-main">
  				{posts.map((post) => 
  				 <div key={post.id} className="post">	
  				 	<Link to={`/posts/${post.id}`} key={post.name}>	
					   <h3 className="list-group-item active">{post.title}</h3>
				    </Link>  
  				   <p className="list-group-item">Author: {post.author}</p>
  				   <p className="list-group-item">{post.body}</p>
  				   <p className="list-group-item details"><UpIcon/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details">comments</p>
  				   <p className="list-group-item details">{post.category}</p>
  				   <p className="list-group-item details"><DownIcon/></p>
  				 </div>  
  				)}
			</div>
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

/*
<Link to={`/posts/${post.id}`} key={post.name}>	
					   <h3 className="list-group-item active">Title: {post.title}</h3>
					 </Link>  
*/