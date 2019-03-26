import { UPLOAD_IMAGES, UPDATE_CURRENT_IMAGE, REMOVE_UPLOADED_IMAGE } from './types'

const reorderIndex = (img, index) => ({ ...img, index })

const initialState = {
  uploadImages: [],
  currentImage: null
}

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES:
      return {
        ...state,
        uploadImages: [
          ...action.uploadImages.map(img => ({ src: img })),
          ...state.uploadImages
        ].map(reorderIndex)
      }
    case UPDATE_CURRENT_IMAGE:
      return {
        ...state,
        currentImage: action.currentImage
      }
    case REMOVE_UPLOADED_IMAGE:
      const uploadImages = state.uploadImages
        .filter((item, index) => index !== action.imageIndex)
        .map(reorderIndex)
      const clearCurrentImageOrNot = (state) => {
        if (!state.currentImage) return null

        if (state.uploadImages.length === 0) return null
        // if the removed one is currentImage should clear
        else if (state.currentImage.index === action.imageIndex) return null
        // remove image will affect to image's index after action.imageIndex
        return action.imageIndex < state.currentImage.index
          ? { ...state.currentImage, index: state.currentImage.index - 1 }
          : state.currentImage
      }
      return {
        ...state,
        uploadImages,
        currentImage: clearCurrentImageOrNot(state)
      }
    default:
      return state
  }
}
