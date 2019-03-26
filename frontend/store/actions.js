import { UPLOAD_IMAGES, UPDATE_CURRENT_IMAGE, REMOVE_UPLOADED_IMAGE } from './types'

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
