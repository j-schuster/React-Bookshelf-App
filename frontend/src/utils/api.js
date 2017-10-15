let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

export const API = `http://localhost:3001`;
export const owner = 'Johann';

export const headers = {
  Accept: 'application/json',
  Authorization: owner
};

//CATEGORIES
export const fetchAllCategories = () => {
	return fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)
}
// POSTS
export const fetchAllPosts = () => {
	return fetch(`${API}/posts`, { headers })
    .then(res => res.json())
    .then(data => data) 
}

export const fetchCategoryPosts = (category) => {
	return fetch(`${API}${category}/posts`, { headers })  
    .then(res => res.json())
    .then(data => data)
}

export const fetchPostDetails = (id) => {
	return fetch(`${API}${id}`, { headers }) 
    .then(res => res.json())
    .then(data => data)
}

// COMMENTS
export const fetchComments = (id) => {
  return fetch(`${API}/posts/${id}/comments`, { headers })
    .then(response => response.json())
}






