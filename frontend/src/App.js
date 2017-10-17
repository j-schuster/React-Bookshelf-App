import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Post from './components/posts'
import AddPost from './components/addPost'
import PostInfo from './components/postInfo'
import EditPost from './components/editPost'
//import PostComment from './components/postComment'
//import EditComment from './components/editComment'

class App extends Component {


  render() {
    
    return (
      <div>
         <Route exact path="/" render={() => (<MainPage/>)}/>
         <Route exact path="/new/post" render={() => (<AddPost/>)}/> 
         <Route path="/category/edit/:id" render={() => (<EditPost/>)}/>
         <Route exact path="/:category" render={() => (<Post/>)}/>      
         <Route exact path="/posts/:id" render={() => (<PostInfo/>)}/>
      </div>
       
    );
  }
}

export default App;

/*
   MAKE MODALS FOR COMMENTS
   <Route path="/:category/:id/comments/new" render={() => (<PostComment/>)} />
   <Route path="/:category/:postId/comments/edit/:id" render={() => (<EditComment/>)}/>
*/