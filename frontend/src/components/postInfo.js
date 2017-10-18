import React from 'react'
import { connect } from 'react-redux'
import UpIcon from 'react-icons/lib/go/arrow-up'
import DownIcon from 'react-icons/lib/go/arrow-down'
import { getPostDetails, removePost } from '../actions/postActions'
import { Redirect } from 'react-router-dom'

class PostInfo extends React.Component {

  constructor(){
    super();
    this.state = {
      redirect: false
    }
  }

	componentDidMount(){
		const id = window.location.pathname
		this.props.loadPostInfo(id)
	}

  handleClick = (id) => {
    this.props.deletePost(id)
    this.setState({ redirect: true })

  }

	render() {
    const { redirect } = this.state
		const post = this.props.postDetails
		const comments = this.props.postComments
	
    if(redirect){
       return <Redirect to='/'/>
    }
		return(
			<div>
			<div className="navbar"><h1>Readable</h1></div>
				{post !== undefined ? 
					<div className="list-group posts-main">
  				{post.map((post) => 
  				 <div key={post.id} className="post">	
  				   <h3 className="list-group-item active">{post.title}</h3>
  				    <p className="list-group-item"><i>By </i> {post.author} <i>On </i>{new Date(post.timestamp).toString().substr(0,16)}</p>
  				   <p className="list-group-item">{post.body}</p>
  				   <p className="list-group-item details"><UpIcon/></p>
  				   <p className="list-group-item details">{post.voteScore} votes</p>
  				   <p className="list-group-item details"></p>
  				   <p className="list-group-item details">{post.category}</p>
  				   <p className="list-group-item details"><DownIcon/></p>
             <button onClick={() => this.handleClick(post.id)}>Delete Post</button>
  				   <hr/>
  				   <div className="comments-section">
  				  <h6>COMMENTS</h6>
  				  <hr/>
  				   {comments.map((comment) => (
  				   	<div className="list-group" key={comment.id}>	
  				   		<p>{comment.body}</p>
  				   		<p className="list-group-item"></p>
  				   		<p className="list-group-item details"><UpIcon/></p>
  				   		<p className="list-group-item details">{comment.author}</p>
  				   		<p className="list-group-item details">{new Date(comment.timestamp).toString().substr(0,16)}</p>
  				   		<p className="list-group-item details">{comment.voteScore} votes</p>
  				   		<p className="list-group-item details"><DownIcon/></p>
  				   		<hr/>
  				   	</div>
  				   	))}
  				   </div>
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

const mapStateToProps = state => {

	return {
		postDetails: state.postDetails.post,
		postComments: state.postDetails.comments
	}
}

const mapDispatchToProps = dispatch => ({
	loadPostInfo: (id) => dispatch(getPostDetails(id)),
  deletePost: (id) => dispatch(removePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo)

