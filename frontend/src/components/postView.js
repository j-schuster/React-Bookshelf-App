import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upVote, downVote } from '../actions/postActions'
import UpIcon from 'react-icons/lib/md/arrow-drop-up'
import DownIcon from 'react-icons/lib/md/arrow-drop-down'
import Spinner from 'react-spinner-material'


class PostView extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: '',
		}
	}

	componentWillReceiveProps(props){
		setTimeout(function(){
			this.setState({posts: props.posts})
		}.bind(this), 1000);
		
	}

	getComments(postId, comments){
	   const hey = comments.filter((comment) => comment[postId])
	 return hey.map(x => x[postId].length)
	}

	vote = (id, action) => {
		action === 'downVote' ? this.props.downVotePost(id, action) : this.props.upVotePost(id, action)
	}

		byVotes = () => {
		const posts = this.props.posts
		const arranged = posts.sort((a, b) => {
  			return a.voteScore < b.voteScore
			})
		this.setState({ posts: arranged})
	}

	byTime = () => {
		const allPosts = this.props.posts
		const arrByTime = allPosts.sort((a, b) => {
  			return a.timestamp < b.timestamp
			})
		this.setState({ posts: arrByTime })
	}


render() {
	const { comments } = this.props
	//const posts = this.props.posts
	const info = this.state.posts
 
	return(
		<div className="all-posts">
		
		
		 {info ? 
			<div className="list-group posts-main">
  				{info.map((post) => 
  				 <div key={post.id} className="post">	
  				   	<Link to={`/posts/${post.id}`} key={post.name}>	
					   <h3 className="list-group-item active">
					   
					   {post.title}</h3>
				    </Link>  
  				   <p className="list-group-item"><i>By </i> {post.author} <i>On </i>{new Date(post.timestamp).toString().substr(0,16)}</p>
  				   <p className="list-group-item"><samp>{post.body}</samp></p>
  				   <p className="list-group-item details post-icon">
  				   <UpIcon onClick={() => this.vote(post.id, 'upVote')}/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details">{this.getComments(post.id, comments)}  comments</p>
  				   <p className="list-group-item details">{post.category}</p>
  				   <p className="list-group-item details post-icon">
  				   <DownIcon onClick={() => this.vote(post.id, 'downVote')}/></p>
  				 </div>  
  				)}
			</div> 
			:	
			<div className="loading">
		 <Spinner
        size={120}
        spinnerColor={"red"}
        spinnerWidth={2}
        visible={true}
         />
         </div>
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


/*
<h4>Organize Posts</h4>
 <button className="btn btn-default" onClick={this.byVotes}>By Votes</button>
		 <button className="btn btn-default" onClick={this.byTime}>By Time</button>

*/