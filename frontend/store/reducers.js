import { UPLOAD_IMAGES } from './types'

const initialState = {
  uploadImages: []
}

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return {
        ...state,
        uploadImages: [...action.uploadImages, ...state.uploadImages]
      }
    default:
      return state
  }
}
