import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import UpIcon from 'react-icons/lib/ti/thumbs-up'
import DownIcon from 'react-icons/lib/ti/thumbs-down'
import { Redirect } from 'react-router-dom'
import TrashCan from 'react-icons/lib/fa/trash'
import EditIcon from 'react-icons/lib/fa/edit'
import AddComIcon from 'react-icons/lib/md/control-point'
import { upVotePI, downVotePI, commentUpVote ,commentDnVote} from '../actions/postActions'

import { getPostDetails,
         removePost,
         addNewComment, 
         removeComment, 
         modifyPost,
         modifyComment } from '../actions/postActions'



class PostInfo extends React.Component {

  constructor(){
    super();
    this.state = {
      commentId: '',
      commentBody: '',
      commentAuthor: '',
      redirect: false,
      commentModal: false,
      editPostModal: false,
      editCommentModal: false
      
    }
  }

	componentDidMount(){
		const id = window.location.pathname
		this.props.loadPostInfo(id)
	}

  removePost = (id) => {
    this.props.deletePost(id)
    this.setState({ redirect: true })

  }

  handleModal = (name, body, author, id) => { 
    this.setState({ [name]: true })
    this.setState({ commentId: id })
    this.setState({ commentBody: body })
    this.setState({ commentAuthor: author })
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
        parentDeleted: false,
        commentBody: '',
        commentAuthor: ''

      }

    this.props.addComment(comment)
    this.setState({commentModal: false})

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteComment = (id) => {
    this.props.removeComment(id)  
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
  }

  handleEditComment = (e) => {
    e.preventDefault()

    const id = this.state.commentId

    const comment = {
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      timestamp: Date.now()
    }

    this.props.editComment(id, comment)
    this.setState({ editCommentModal: false })
  }


  vote = (id, action) => {
    action === 'downVote' ? this.props.downVotePostPI(id, action) : this.props.upVotePostPI(id, action)
  }  

  voteComment = (id, action) => {
   action === 'upVote' ? this.props.upVoteComment(id, action) : this.props.dnVoteComment(id, action)
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
  				            <p className="list-group-item details vote-icon"><UpIcon  onClick={()=> this.vote(post.id, 'upVote')}/></p>
  				            <p className="list-group-item details">{post.voteScore} votes</p>
  				            <p className="list-group-item details"></p>
  				            <p className="list-group-item details">{post.category}</p>
  				            <p className="list-group-item details vote-icon"><DownIcon onClick={()=> this.vote(post.id, 'downVote')}/></p>
                      <div >
                      <EditIcon className="post-icon" onClick={() => this.handleModal('editPostModal')}/>
                      <TrashCan className="post-icon" onClick={() => this.removePost(post.id)}/>
                      </div>
                      <hr/>

                      <ReactModal 
                        isOpen={this.state.editPostModal}    
                        className="Modal"
                        overlayClassName="Overlay"
                        >

                      <form onSubmit={(e) => this.handleSubmit(post.id, e)}
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
                      
                      <div className="comments-section">
                        <AddComIcon className="com-icon" 
                                onClick={() => this.handleModal('commentModal')}/>
                                <h6 className="comments-header">COMMENTS</h6>
                                <hr/>
                 
                      <ReactModal 
                        isOpen={this.state.commentModal}    
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
                           <textarea className="form-control" 
                                  onChange={this.handleChange}
                                  type="text" placeholder="Your Name"
                                  value={this.state.commentAuthor}  
                                  name="commentAuthor">
                                                          
                           </textarea>
                          </div>
                          <button type="submit" className="add-comment btn">Submit!</button>
                      </form>               
                      </ReactModal>

                       {comments.map((comment) => (
                          <div className="list-group" key={comment.id}>  
                             <p className="com-auth details"><i>{comment.author} commented:</i></p>
                            
                             <p className="list-group-item">{comment.body}</p>
                        
                             <p className="list-group-item details vote-icon"><UpIcon onClick={() => this.voteComment(comment.id, 'upVote')}/></p>
                             <p className="list-group-item details">{new Date(comment.timestamp).toString().substr(0,16)}</p>
                             <p className="list-group-item details">{comment.voteScore} votes</p>
                             <p className="list-group-item details vote-icon"><DownIcon onClick={() => this.voteComment(comment.id, 'downVote')}/></p>
                          <div>
                        <EditIcon className="post-icon" onClick={() => this.handleModal('editCommentModal', comment.body, comment.author, comment.id)}/> 
                        <TrashCan className="post-icon" onClick={() => this.deleteComment(comment.id)}/>
                        
                      <ReactModal 
                        isOpen={this.state.editCommentModal}    
                        className="Modal"
                        overlayClassName="Overlay"
                        >

                      <form onSubmit={(e) => this.handleEditComment(e)}
                            className="add-comment-form">
                           <div className="form-group">
                           <input className="form-control"
                                     onChange={this.handleChange}
                                     type="text" 
                                     value={this.state.commentBody}
                                     name="commentBody"
                                     >
                           </input>
                           </div>
                           <div className="form-group">  
                           <textarea className="form-control" 
                                  onChange={this.handleChange}
                                  type="text" 
                                  value={this.state.commentAuthor}
                                  name="commentAuthor"
                                  >                          
                           </textarea>
                           </div>
                           <button type="submit" className="add-comment btn">Submit!</button>
                      </form>               
                      </ReactModal>


                       </div>
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
  editPost: (id, post) => dispatch(modifyPost(id, post)),
  editComment: (id, comment) => dispatch(modifyComment(id, comment)),
  upVotePostPI: (id, action) => dispatch(upVotePI(id, action)),
  downVotePostPI: (id, action) => dispatch(downVotePI(id, action)),
  upVoteComment: (id, action) => dispatch(commentUpVote(id, action)),
  dnVoteComment: (id, action) => dispatch(commentDnVote(id, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo)

