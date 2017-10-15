import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Post from './components/posts'
import NewPost from './components/newPost'
import PostInfo from './components/postInfo'
import EditPost from './components/editPost'
import PostComment from './components/postComment'
import EditComment from './components/editComment'

class App extends Component {


  render() {
    
    return (
      <div>
         <Route exact path="/" render={() => (<MainPage/>)}/>
         <Route exact path="/:category" render={() => (<Post/>)}/> 
         <Route exact path="/posts/new" render={() => (<NewPost/>)}/>      
         <Route exact path="/posts/:id" render={() => (<PostInfo/>)}/>
         <Route exact path="/category/edit/:id" render={() => (<EditPost/>)}/>
         <Route exact path="/:category/:id/comments/new" render={() => (<PostComment/>)} />
         <Route exact path="/:category/:postId/comments/edit/:id" render={() => (<EditComment/>)}/>
      </div>
       
    );
  }
}

export default App;

