import React from 'react'
import { addPost } from '../actions/postActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class AddPost extends React.Component {

	constructor(props){
		super(props);
		this.state = {	
		 	 postTitle: '',
			  postBody: '',
		    postAuthor: '',
		  postCategory: '',
		      redirect: false,
		        linkId: '',
		        value: 'react'
		}
	}


	handleChange = (event) => {
		this.setState({		
			[event.target.name]: event.target.value					
		})
	}

	handleSubmit = e => {

		e.preventDefault()

		let uniqueId = () =>  Math.random().toString(36).substr(2, 16)

			const post = {
				id:  uniqueId(),
		 timestamp: Date.now(),
		 	 title: this.state.postTitle,
			  body: this.state.postBody,
		    author: this.state.postAuthor,
		  category: this.state.postCategory,
		 votescore: 0,
		   deleted: false
			}
			
			this.props.addNewPost(post)
			this.setState({ linkId: post.id })
			this.setState({ redirect: true })
			
	}

	
	render() {
		const { redirect, linkId } = this.state

		if (redirect) {
       		return <Redirect to={`/posts/${linkId}`}/>
     	}
		return(
		<div className="add-post">
			<div className="navbar"><h1>Readable</h1></div>
			   <form onSubmit={this.handleSubmit}>	
				  <div className="form">	
				     <h1>Add New Post</h1>			
				        <div className="form-group">
							<input className="form-control" 
								   name="postTitle"	
								   type="text"
								   placeholder="Title" 
								   value={this.state.title} 
								   onChange={this.handleChange}/>
					 	</div>	
					    <div className="form-group">	
				        <textarea type="text" 
				        		  name="postBody"	
				        		  className="form-control" 
				        		  placeholder="Body"
				        		  value={this.state.body}
				        		  onChange={this.handleChange}/>
					    </div>
					    <select className="form-control"
					    		  name="postCategory"  
					    		  onChange={this.handleChange}
					    		  defaultValue="react">
					      <option value="select" disabled>Select category...</option>		
					   	  <option value="react" >React</option>
					   	  <option value="redux">Redux</option>
					   	  <option value="udacity">Udacity</option>
					    </select>				    
					    <div className="form-group">	
					       <input type="text"
						   		  name="postAuthor" 
						   		  className="form-control" 
						   		  placeholder="Name"
						   		  value={this.state.author}
						   		  onChange={this.handleChange}/>
		     	   	 </div>		     	
	     		  <input type="submit" value="submit" className="btn" />  		     		
			    </div>
			  </form>
		    </div>
		);
	}

}

const mapDispatchToProps = dispatch => ({
  addNewPost: (info) => dispatch(addPost(info))
});

export default connect(null, mapDispatchToProps)(AddPost)






