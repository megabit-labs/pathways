import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import createEditPathwayReducer from './store/reducers/createEditPathway'

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const rootReducer = combineReducers({
  createEditPathway: createEditPathwayReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


const client = new ApolloClient({
  uri: 'https://pathways.bitsacm.in/graphql',
});

const app = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
)

serviceWorker.unregister();
