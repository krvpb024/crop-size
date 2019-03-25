import { createStore } from 'redux'
import { imageReducer } from './reducers'

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  imageReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
/* eslint-enable */
