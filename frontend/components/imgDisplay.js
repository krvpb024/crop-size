import { html, define, dispatch } from 'hybrids'
import { connect } from '../utils/factories'
import { store } from '../store'
import './imgCanvas'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgDisplay.css', 'utf8')

export const imgDisplay = {
  currentImage: connect(store, state => state.currentImage),
  uploadImages: connect(store, (state) => state.uploadImages),
  showImageOrInstruction: ({ currentImage, uploadImages }) => {
    if (uploadImages.length === 0) return html`<p>Please Upload Images</p>`
    else if (!currentImage) return html`<p>Please Select an Image</p>`
    return html`
      <img
        src="${currentImage.src}"
        class="inner-container__img"
        onload="${(host) => { dispatch(host, 'imgLoaded') }}"
      >
    `
  },
  displayImage: {
    connect: (host, key) => {
      host.addEventListener('imgLoaded', () => {
        const imgElement = host.shadowRoot.querySelector('.inner-container__img')
        if (imgElement) {
          host[key] = {
            offsetWidth: imgElement.offsetWidth,
            offsetHeight: imgElement.offsetHeight,
            naturalWidth: imgElement.naturalWidth,
            naturalHeight: imgElement.naturalHeight
          }
        } else {
          host[key] = null
        }
      })
      return () => {
        host.removeEventListener('imgLoaded')
      }
    }
  },
  render: ({ showImageOrInstruction, displayImage }) => html`
    <section class="img-display">
      <div class="img-display__inner-container">
        ${showImageOrInstruction}
        ${displayImage ? html`
          <img-canvas displayImage="${displayImage}"></img-canvas>
        ` : ''}
      </div>
    </section>
  `.style(style)
}

define('img-display', imgDisplay)
