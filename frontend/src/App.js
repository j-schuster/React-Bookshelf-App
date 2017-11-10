import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from './components/mainPage'
import Post from './components/posts'
import AddPost from './components/addPost'
import PostInfo from './components/postInfo'
import NotFound from './components/notFound'



class App extends Component {
  render() { 
    return (  
      <Switch>
         <Route exact path="/" render={() => (<MainPage/>)}/>
         <Route exact path="/new/post" render={() => (<AddPost/>)}/> 
         <Route exact path="/:category" render={() => (<Post/>)}/>      
         <Route exact path="/:category/:id" render={() => (<PostInfo/>)}/> 
         <Route path="*" render={() => (<NotFound/>)}/>     
      </Switch>              
    );
  }
}

export default App

