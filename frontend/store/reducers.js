import {
  UPLOAD_IMAGES,
  UPDATE_CURRENT_IMAGE,
  REMOVE_UPLOADED_IMAGE,
  UPDATE_CURRENT_IMAGE_SIZE,
  UPDATE_BOUNDING_BOX
} from './types'

const reorderIndex = (img, index) => ({ ...img, index })

const initialState = {
  uploadImages: [],
  currentImage: null,
  imageSize: null,
  boundingBox: null
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
        boundingBox: null,
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
        imageSize: null,
        currentImage: clearCurrentImageOrNot(state)
      }
    case UPDATE_CURRENT_IMAGE_SIZE:
      return {
        ...state,
        imageSize: action.imageSize
      }
    case UPDATE_BOUNDING_BOX:
      return {
        ...state,
        boundingBox: action.boundingBox
      }
    default:
      return state
  }
}
