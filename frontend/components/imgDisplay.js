import { html, define } from 'hybrids'
import { connect } from '../utils/factories'
import { store } from '../store'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgDisplay.css', 'utf8')

export const imgDisplay = {
  currentImage: connect(store, state => state.currentImage),
  uploadImages: connect(store, (state) => state.uploadImages),
  showImageOrInstruction: ({ currentImage, uploadImages }) => {
    if (uploadImages.length === 0) return html`<p>Please Upload Images</p>`
    else if (!currentImage) return html`<p>Please Select an Image</p>`
    return html`<img src="${currentImage.src}" class="inner-container__img">`
  },
  render: ({ currentImage, showImageOrInstruction }) => html`
    <section class="img-display">
      <div class="img-display__inner-container">
        ${showImageOrInstruction}
      </div>
    </section>
  `.style(style)
}

define('img-display', imgDisplay)
