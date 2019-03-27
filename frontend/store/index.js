import { createStore } from 'redux'
import { imageReducer } from './reducers'

const actionSanitizer = (action) => (
  action.type === 'FILE_DOWNLOAD_SUCCESS' &&
  action.data ? { ...action, data: '<<LONG_BLOB>>' } : action
)

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  imageReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
  })
)
/* eslint-enable */
