import { fetchAllCategories } from '../utils/api'


export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'

export const recieveCategories = (data) => ({
	type: RECIEVE_CATEGORIES,
	data
})


export const getAllCategories = () => dispatch => {
  	fetchAllCategories()
  	.then(data => dispatch(recieveCategories(data)))
}

