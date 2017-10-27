import React from 'react'
import Categories from './categories'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../actions/postActions'
import PostView from './postView'
import AddIcon from 'react-icons/lib/md/add-circle'


class MainPage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			posts: ''
		}
	}
		
	componentDidMount(){		
		this.props.allPosts()
	}

	 getComments(postId, comments){
	   const commentsTotal = comments.filter((comment) => comment[postId])
	 	return commentsTotal.map(x => x[postId].length)
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
		this.setState({ posts: arrByTime})
	}

	

render() {	

	
	return(
		<div>	
			<div className="navbar"><h1>Readable</h1></div>
			<Categories/>
			 <button onClick={this.byVotes}>By Votes</button>
		     <button onClick={this.byTime}>By Time</button>
			 <PostView posts={this.props.posts} comments={this.props.comments}/>			
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
