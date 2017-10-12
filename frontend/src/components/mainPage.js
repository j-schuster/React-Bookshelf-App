import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions/postActions'
import UpIcon from 'react-icons/lib/fa/angle-up'
import DownIcon from 'react-icons/lib/fa/angle-down'


class MainPage extends React.Component {
		


	componentDidMount(){
		this.props.allPosts()
	}

render() {
	
const posts = this.props.posts
	return(
		<div>
		<h1>Main Page</h1>
			<hr/>
			<Categories/>
			<div className="list-group posts-main">
  				{posts.map((post) => 
  				 <div key={post.id}>	
  				   <h3 className="list-group-item active">Title: {post.title}</h3>
  				   <p className="list-group-item">Body: {post.body}</p>
  				   <p className="list-group-item">Author: {post.author}</p>
  				   <p className="list-group-item">Category: {post.category}</p>
  				   <p className="list-group-item">Votescore: <UpIcon/> {post.voteScore} <DownIcon/></p>
  				 </div>  
  				)}
			</div>
		</div>
		);	
	}
} 

const mapStateToProps = state => {
	return {
		posts : state.posts
	}
}

const mapDispatchToProps = dispatch => ({
  allPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

