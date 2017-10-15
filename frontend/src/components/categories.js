import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllCategories } from '../actions/categoryActions'


class Categories extends React.Component {
	
componentDidMount(){
	this.props.getCategories()
	}
	
render() {
	
	const items = this.props.categories
	
	return(
		<div>
			<div className="list-group categories">
				<a className="list-group-item active">Categories</a>
				{items.map((item) => 
				<Link to={`/${item.name}`} key={item.name}>
					<p className="list-group-item" >{item.name}</p>
				</Link>
				)}
  			</div>
		</div>
		);	
	}
} 

const mapStateToProps = state => {
	return {
		categories : state.categories
	}
}

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories)



