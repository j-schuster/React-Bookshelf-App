import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './components/mainPage'
import Post from './components/posts'
import AddPost from './components/addPost'
import PostInfo from './components/postInfo'
//import NotFound from './components/notFound'



class App extends Component {


  render() {
    
    return (
      <div>
         <Route exact path="/" render={() => (<MainPage/>)}/>
         <Route exact path="/:category" render={() => (<Post/>)}/>      
         <Route exact path="/posts/:id" render={() => (<PostInfo/>)}/>
      </div>
       
    );
  }
}

export default App;

