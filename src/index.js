import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app/App'
import store from './store'

import './styles/index.scss'
import { extendedApiSlice } from './components/heroesFilters/filtersSlice'

store.dispatch(extendedApiSlice.endpoints.getFilters.initiate())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);