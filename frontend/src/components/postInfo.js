import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import UpIcon from 'react-icons/lib/go/arrow-up'
import DownIcon from 'react-icons/lib/go/arrow-down'
import { getPostDetails, removePost, addNewComment, removeComment, modifyPost } from '../actions/postActions'
import { Redirect } from 'react-router-dom'

class PostInfo extends React.Component {

  constructor(){
    super();
    this.state = {
      redirect: false,
      showModal: false,
      commentBody: '',
      commentAuthor: '',
      editPostModal: false,

    }
  }

	componentDidMount(){
		const id = window.location.pathname
		this.props.loadPostInfo(id)
	}

  handleClickDelete = (id) => {
    this.props.deletePost(id)
    this.setState({ redirect: true })

  }

  handleAddComment = () => { 
    this.setState({ showModal: true })
  }

  openEditPostModal = () => {
    this.setState({ editPostModal: true })
  }

  submitComment = (id, e) => { 
    e.preventDefault()
    

    let uniqueId = () =>  Math.random().toString(36).substr(2, 16)

    const comment = {
      id: uniqueId(),
      parentId: id,
      timestamp: Date.now(),
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    }
    this.props.addComment(comment)
    this.setState({showModal: false})
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteComment = (id) => {
    this.props.removeComment(id)  
  }

  handleSubmit = (id, e) => {
    e.preventDefault();
    const title = this.title.value
    const body = this.body.value
     
    const post = {
      title: title,
      body: body
    }  

    this.props.editPost(id, post)
    this.setState({ editPostModal: false })
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
      <Link to='/'>
			<div className="navbar"><h1>Readable</h1></div>

      </Link>
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
             <button className="del-btn" onClick={() => this.handleClickDelete(post.id)}>Delete Post</button>
  				   <button onClick={this.openEditPostModal}>Edit Post</button>
             <hr/>
  				   <div className="comments-section">
  				   <button className="add-comment-btn" 
                     onClick={this.handleAddComment}>Add Comment</button>
            <h6 className="comments-header">COMMENTS</h6>
  				  <hr/>
        
              <ReactModal 
                isOpen={this.state.editPostModal}    
                className="Modal"
                overlayClassName="Overlay"

                >
              <form   onSubmit={(e) => this.handleSubmit(post.id, e)}
                      className="add-comment-form">
                 <div className="form-group">
                   <input className="form-control"
                             ref={(title) => this.title = title} 
                             type="text" 
                             defaultValue={post.title}
                             name="postTitle"
                             >
                   </input>
                   </div>
                  <div className="form-group">  
                   <textarea className="form-control" 
                          ref={(body) => this.body = body} 
                          type="text" 
                          defaultValue={post.body}
                          name="postBody"
                          >                          
                   </textarea>
                  </div>
                  <button type="submit" className="add-comment btn">Submit!</button>
              </form>               
            </ReactModal>
         
            <ReactModal 
                isOpen={this.state.showModal}    
                className="Modal"
                overlayClassName="Overlay"
                >
              <form onSubmit={(e) => this.submitComment(post.id, e)} 
                    className="add-comment-form">
                 <div className="form-group">
                   <textarea className="form-control"
                             onChange={this.handleChange}
                             type="text" 
                             placeholder="Your Comment"
                             name="commentBody"
                             value={this.state.commentBody}>
                   </textarea>
                   </div>
                  <div className="form-group">  
                   <input className="form-control" 
                          onChange={this.handleChange}
                          type="text" placeholder="Your Name"
                          name="commentAuthor"
                          value={this.state.commentAuthor}>                          
                   </input>
                  </div>
                  <button type="submit" className="add-comment btn">Submit!</button>
              </form>               
            </ReactModal>

  				   {comments.map((comment) => (
  				   	<div className="list-group" key={comment.id}>	
  				   		<p>{comment.body}</p>
  				   		<p className="list-group-item"></p>
  				   		<p className="list-group-item details"><UpIcon/></p>
  				   		<p className="list-group-item details">{comment.author}</p>
  				   		<p className="list-group-item details">{new Date(comment.timestamp).toString().substr(0,16)}</p>
  				   		<p className="list-group-item details">{comment.voteScore} votes</p>
  				   		<p className="list-group-item details"><DownIcon/></p>
                <button onClick={() => this.deleteComment(comment.id)}>Delete</button>
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
  deletePost: (id) => dispatch(removePost(id)),
  addComment: (comment) => dispatch(addNewComment(comment)),
  removeComment: (id) => dispatch(removeComment(id)),
  editPost: (id, post) => dispatch(modifyPost(id, post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo)

