import { UPLOAD_IMAGES } from './types'

export const uploadImages = (uploadImages) => {
  return {
    type: UPLOAD_IMAGES,
    uploadImages
  }
}
