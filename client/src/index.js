
import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider  } from 'react-redux'
import Container from './components/App'
import rootReducer from './reducers'

let data = JSON.parse(localStorage.getItem('fullstate'));

const store = createStore(rootReducer, !data ?  {visibilityFilter: 'SHOW_ALL', todos:[]}  : data );




render(
  <Provider store={store}>
    <Container store={store} />
  </Provider>,
  document.getElementById('root')
)




registerServiceWorker();
