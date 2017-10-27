import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upVote, downVote } from '../actions/postActions'
import UpIcon from 'react-icons/lib/ti/thumbs-up'
import DownIcon from 'react-icons/lib/ti/thumbs-down'


class PostView extends React.Component {

	getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 return hey.map(x => x[postId].length)
	}

	vote = (id, action) => {
		action === 'downVote' ? this.props.downVotePost(id, action) : this.props.upVotePost(id, action)
	}

render() {
	const { comments } = this.props
	const posts = this.props.posts
	
	return(
		<div>
		 {posts !== undefined ? 
			<div className="list-group posts-main">
  				{posts.map((post) => 
  				 <div key={post.id} className="post">	
  				   	<Link to={`/posts/${post.id}`} key={post.name}>	
					   <h3 className="list-group-item active">
					   
					   {post.title}</h3>
				    </Link>  
  				   <p className="list-group-item"><i>By </i> {post.author} <i>On </i>{new Date(post.timestamp).toString().substr(0,16)}</p>
  				   <p className="list-group-item">{post.body}</p>
  				   <p className="list-group-item details post-icon">
  				   <UpIcon className="up-vote" onClick={() => this.vote(post.id, 'upVote')}/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details">{this.getComments(post.id, comments)}  comments</p>
  				   <p className="list-group-item details">{post.category}</p>
  				   <p className="list-group-item details post-icon">
  				   <DownIcon className="down-vote" onClick={() => this.vote(post.id, 'downVote')}/></p>
  				 </div>  
  				)}
			</div> 
			:
			<h1>CHILL</h1>
		}
		</div>
		);	
	}
} 


const mapDispatchToProps = dispatch => ({
  upVotePost: (id, action) => dispatch(upVote(id, action)),
  downVotePost: (id, action) => dispatch(downVote(id, action))
})

export default connect(null, mapDispatchToProps)(PostView)