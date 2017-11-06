import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../actions/postActions'
import PostView from './postView'
import AddIcon from 'react-icons/lib/md/add-circle'
import Chat from 'react-icons/lib/md/chat'

class MainPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: '',
			
		}
	}

		
	componentDidMount = () => {
		this.props.allPosts()
	}

	componentWillReceiveProps(props){
		this.setState({ posts: props.posts })
	}

	 getComments(postId, comments){
	   const commentsTotal = comments.filter((comment) => comment[postId])
	 	return commentsTotal.map(x => x[postId].length)
	}



render() {	

	return(
		<div>
			<div className="navbar"><h1><Chat className="chat"/>Readable</h1></div>
			<div className="col-md-2"><Categories/></div>
			<div className="col-md-8"><PostView posts={this.props.posts} comments={this.props.comments}/>	</div>			
			<Link to='/new/post'>
		    <div className="add-icon"><AddIcon/></div>
			</Link>	
		</div>
		);	
	}
} 

const mapStateToProps = state => {
	const { comments, posts } = state
	

	return {
		posts : posts.posts,
		comments : [comments]
	}
}

const mapDispatchToProps = dispatch => ({
  allPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
