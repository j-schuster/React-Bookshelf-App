import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions/postActions'
import UpIcon from 'react-icons/lib/go/arrow-up'
import DownIcon from 'react-icons/lib/go/arrow-down'


class MainPage extends React.Component {
		
	componentDidMount(){		
		this.props.allPosts()
	}

	 getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 return hey.map(x => x[postId].length)
	}

render() {
const { comments, posts } = this.props

	return(
		<div>
			<div className="navbar"><h1>MAIN PAGE</h1></div>
			<Categories/>
			<div className="list-group posts-main">
  				{posts.map((post) => 
  				 <div key={post.id} className="post">	
  				   <h3 className="list-group-item active">{post.title}</h3>
  				   <p className="list-group-item">Author: {post.author}</p>
  				   <p className="list-group-item">{post.body}</p>
  				   <p className="list-group-item details"><UpIcon/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details">{this.getComments(post.id, comments)}  comments</p>
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
	const { comments } = state

	return {
		posts : state.posts,
		comments : [comments]
	}
}

const mapDispatchToProps = dispatch => ({
  allPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
// {this.getComments(post.id, comments)} 
// {new Date(this.props.comment.timestamp).toString().substr(0,16)}
