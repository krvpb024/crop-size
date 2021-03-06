import { html, define } from 'hybrids'
import { connect } from '../utils/factories'
import closeIcon from '../assets/icon/ic_close_18px.svg'
import { store } from '../store'
import { updateCurrentImage, removeUploadedImage } from '../store/actions'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgSwiperItem.css', 'utf8')

const updateCurrentImageHandler = (host) => {
  if (host.image === host.currentImage) return
  store.dispatch(updateCurrentImage(host.image))
}

const removeUploadedImageHandler = (host, e) => {
  e.stopPropagation()
  store.dispatch(removeUploadedImage(host.image.index))
}

export const ImgSwiperItem = {
  // props
  image: {},
  // data
  currentImage: connect(store, state => state.currentImage),
  // render
  render: ({ image }) => html`
    <div class="img-item" onclick="${updateCurrentImageHandler}">
      <img src="${image.src}" class="img-item__image">
      <button class="img-item__close-button" onclick="${removeUploadedImageHandler}">
        <img src="${closeIcon}">
      </button>
    </div>
  `.style(style)
}

define('img-swiper-item', ImgSwiperItem)
