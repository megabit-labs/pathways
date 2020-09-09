import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import createEditPathwayReducer from './store/reducers/createEditPathway';
import DisplayPathwayReducer from './store/reducers/displayPathway';
import DisplayProfileReducer from './store/reducers/displayProfile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  createEditPathway: createEditPathwayReducer,
  displayPathway: DisplayPathwayReducer,
  displayProfile: DisplayProfileReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


const client = new ApolloClient({
  uri: 'https://pathways.bitsacm.in/graphql',
  // uri: 'http://localhost:3003/graphql',
});

const app = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
)

serviceWorker.unregister();
