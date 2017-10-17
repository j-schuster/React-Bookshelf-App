import React from 'react'

class AddPost extends React.Component {

	constructor(props){
		super(props);
		this.state = {	
				id: '',
		 timestamp: '',
		 	 title: '',
			  body: '',
		    author: '',
		  category: '',
		 votescore: 0,
		   deleted: false	
		}
	}

	handleChange = (event) => {
		this.setState({		
			[event.target.name]: event.target.value					
		})
	}

	assignTimeAndId = (e) => {

		var uniqueId = () =>  Math.random().toString(36).substr(2, 16);		
		this.setState({ timestamp: Math.floor(Date.now() / 1000) })
		this.setState({ id: uniqueId() })
		e.preventDefault()

		const newPost = this.state	
		console.log(newPost)
	}
	
	render() {
		
		return(
		<div className="add-post">
			<div className="navbar"><h1>Readable</h1></div>
			   <form onSubmit={this.assignTimeAndId}>	
				  <div className="form">	
				     <h1>Add New Post</h1>			
				        <div className="form-group">
						<input className="form-control" 
							   name="title"	
							   type="text"
							   placeholder="Title" 
							   value={this.state.title} 
							   onChange={this.handleChange}/>
					 	</div>	
					    <div className="form-group">	
				        <textarea type="text" 
				        		  name="body"	
				        		  className="form-control" 
				        		  placeholder="Body"
				        		  value={this.state.body}
				        		  onChange={this.handleChange}/>
					    </div>
					    <select className="form-control"
					    		name="category"  
					    		onChange={this.handleChange}>
					   	  <option value="react">React</option>
					   	  <option value="redux">Redux</option>
					   	  <option value="udacity">Udacity</option>
					    </select>				    
					   <div className="form-group">	
					   <input type="text"
					   		  name="author" 
					   		  className="form-control" 
					   		  placeholder="Name"
					   		  value={this.state.author}
					   		  onChange={this.handleChange}/>

		     	    </div>	
	     		  <button type="submit" value="submit" className="btn11">ADD!</button>
			    </div>
			  </form>
		    </div>
		);
	}
}

export default AddPost