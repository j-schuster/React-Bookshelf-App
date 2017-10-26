import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upVote } from '../actions/postActions'
import UpIcon from 'react-icons/lib/ti/thumbs-up'
import DownIcon from 'react-icons/lib/ti/thumbs-down'


class PostView extends React.Component {

	 getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 return hey.map(x => x[postId].length)
	}

	vote = (id, action) => {
		this.props.upVotePost(id, action)
	}


render() {
	const { comments, posts } = this.props
   console.log(posts)
 
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
  				   <p className="list-group-item details post-icon"><UpIcon onClick={() => this.vote(post.id, 'upvote')}/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details">{this.getComments(post.id, comments)}  comments</p>
  				   <p className="list-group-item details">{post.category}</p>
  				   <p className="list-group-item details post-icon"><DownIcon/></p>
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
  upVotePost: (id, action) => dispatch(upVote(id, action))
})

export default connect(null, mapDispatchToProps)(PostView)