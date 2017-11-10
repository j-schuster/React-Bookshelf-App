import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upVote, downVote } from '../actions/postActions'
import ReactModal from 'react-modal'
import UpIcon from 'react-icons/lib/md/arrow-drop-up'
import DownIcon from 'react-icons/lib/md/arrow-drop-down'
import Spinner from 'react-spinner-material'
import TrashCan from 'react-icons/lib/fa/trash'
import EditIcon from 'react-icons/lib/fa/edit'
import Exit from 'react-icons/lib/md/highlight-remove'
import { 
         removePost, 
         modifyPostInPosts,
          			 } from '../actions/postActions'


class PostView extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: '',
			editPostModal: false,
			postId: '',
			postTitle: '',
			postBody: '',
		}
	}

	removePost = (id) => {
    this.props.deletePost(id)
    window.location.reload()

  }

    handleModal = (name, title, body, id) => { 
    this.setState({ [name]: true, postId: id })
    this.setState({ 
    	postTitle: title,
    	postBody: body
     })
    
  }

    handleSubmit = (id, e) => {
    e.preventDefault()

    const title = this.title.value
    const body = this.body.value
 
    const post = {
      title: title,
      body: body
    }  

    this.props.editPost(id, post)
    this.setState({ editPostModal: false })
    this.setState({ postId: '' })
  }

  closeEdit = () => {
  	this.setState({ editPostModal: false })
  }


	componentWillReceiveProps(props){
		setTimeout(function(){ this.setState({posts: props.posts})}.bind(this), 500);		
	}

	getComments(postId, comments){
	   const commentsOnPost = comments.filter((comment) => comment[postId])
	 return commentsOnPost.map(x => x[postId].length)
	}

	vote = (id, action) => {
		action === 'downVote' ? this.props.downVotePost(id, action) : this.props.upVotePost(id, action)
	}

	byVotes = () => {
		const posts = this.props.posts
		const arranged = posts.sort((a, b) => { return a.voteScore < b.voteScore })
		this.setState({ posts: arranged})
	}

	byTime = () => {
		const allPosts = this.props.posts
		const arrByTime = allPosts.sort((a, b) => { return a.timestamp < b.timestamp })
		this.setState({ posts: arrByTime })
	}

	
render() {
	const { comments } = this.props
	const info = this.state.posts
	
	return(
		<div className="all-posts">
		  {info ? 
			<div className="list-group posts-main">
			  <div className="organize">
				<h4>Organize Posts</h4>
 				<button className="btn btn-default" onClick={this.byVotes}>Most Votes</button>
 				<button className="btn btn-default" onClick={this.byTime}>Most Recent</button>
			  </div>
  			  {info.map((post) => 
  				<div key={post.id} className="post">
  				   <Link to={`/${post.category}/${post.id}`} key={post.name}>	
					  <h3 className="list-group-item">					   
					   {post.title}</h3>
				    </Link>  
  				    <p className="list-group-item"><i>By </i> {post.author} <i>On </i>{new Date(post.timestamp).toString().substr(0,16)}</p>
  				     <p className="list-group-item"><samp>{post.body}</samp></p>
  				     <div>
  				      <EditIcon className="edit-icon" onClick={() => this.handleModal('editPostModal', post.title, post.body, post.id)}/>
                      <TrashCan className="trash-icon" onClick={() => this.removePost(post.id)}/>
                      </div>
  				      <p className="list-group-item details post-icon">
  				       <UpIcon onClick={() => this.vote(post.id, 'upVote')}/></p>
  				        <p className="list-group-item details">{post.voteScore} votes</p>
  				       <p className="list-group-item details">{this.getComments(post.id, comments)}  comments</p>
  				      <p className="list-group-item details">{post.category}</p>
  				     <p className="list-group-item details post-icon">
  				   <DownIcon onClick={() => this.vote(post.id, 'downVote')}/></p>
  				     <ReactModal 
                          isOpen={this.state.editPostModal}    
                          className="Modal"
                          overlayClassName="Overlay"
                      >

                      <form onSubmit={(e) => this.handleSubmit(this.state.postId, e)}
                            className="add-comment-form">
                           <i><Exit className="exit-icon" onClick={this.closeEdit}/></i>
                           <div className="form-group">
                           <input className="form-control"
                                     ref={(title) => this.title = title} 
                                     type="text" 
                                     defaultValue={this.state.postTitle}
                                     name="postTitle"
                                     >
                           </input>
                           </div>
                           <div className="form-group">  
                           <textarea className="form-control" 
                                  ref={(body) => this.body = body} 
                                  type="text" 
                                  defaultValue={this.state.postBody}
                                  name="postBody"
                                  >                          
                           </textarea>
                           </div>
                           <button type="submit" className="add-comment btn">Submit!</button>
                      </form>               
                      </ReactModal>  


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
  downVotePost: (id, action) => dispatch(downVote(id, action)),
  deletePost: (id) => dispatch(removePost(id)),
  editPost: (id, post) => dispatch(modifyPostInPosts(id, post)),
})

export default connect(null, mapDispatchToProps)(PostView)