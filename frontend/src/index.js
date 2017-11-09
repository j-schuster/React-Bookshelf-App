import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
	reducer, 
	composeEnhancers(
		applyMiddleware(thunk)
		)
	)



ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>	
		</Provider>	
	, document.getElementById('root'));
registerServiceWorker();
