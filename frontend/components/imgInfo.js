import { html, define } from 'hybrids'
import { store } from '../store'
import { connect } from '../utils/factories'

export const ImgInfo = {
  imageSize: connect(store, state => state.imageSize),
  boundingBox: connect(store, state => state.boundingBox),
  cropSize: ({ imageSize, boundingBox }) => {
    if (!imageSize || !boundingBox) return null
    return {
      width: Math.round(imageSize.naturalWidth * boundingBox.width),
      height: Math.round(imageSize.naturalHeight * boundingBox.height)
    }
  },
  render: ({ cropSize, imageSize }) => html`
    <section>
      <h2>Image Info</h2>
      ${imageSize ? html`
        <h3>Image Size</h3>
        <p>width: ${imageSize.naturalWidth}</p>
        <p>height: ${imageSize.naturalHeight}</p>
      ` : html``}
      ${cropSize && html`
        <h3>Crop Size</h3>
        <p>width: ${cropSize.width}</p>
        <p>height: ${cropSize.height}</p>
      `}
    </section>
  `
}

define('img-info', ImgInfo)
