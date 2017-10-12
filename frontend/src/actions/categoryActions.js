import {API, headers } from '../utils/api'




export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'

export const recieveCategories = (data) => ({
	type: RECIEVE_CATEGORIES,
	data
})


export const categoriesAPI = () => dispatch => {
  return fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => dispatch(recieveCategories(data)))
}

