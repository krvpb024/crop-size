import {
  UPLOAD_IMAGES,
  UPDATE_CURRENT_IMAGE,
  REMOVE_UPLOADED_IMAGE,
  UPDATE_CURRENT_IMAGE_SIZE,
  UPDATE_BOUNDING_BOX
} from './types'

export const uploadImages = uploadImages => ({
  type: UPLOAD_IMAGES,
  uploadImages
})

export const updateCurrentImage = currentImage => ({
  type: UPDATE_CURRENT_IMAGE,
  currentImage
})

export const removeUploadedImage = imageIndex => ({
  type: REMOVE_UPLOADED_IMAGE,
  imageIndex
})

export const updateCurrentImageSize = imageSize => ({
  type: UPDATE_CURRENT_IMAGE_SIZE,
  imageSize
})

export const updateBoundingBox = boundingBox => ({
  type: UPDATE_BOUNDING_BOX,
  boundingBox
})
