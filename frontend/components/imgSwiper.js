import { html, define } from 'hybrids'
import { store } from '../store'
import fs from 'fs'
// eslint-disable-next-line no-path-concat
const style = fs.readFileSync(__dirname + '/imgSwiper.css', 'utf8')

const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (host, key, invalidate) => store.subscribe(invalidate)
})

export const ImgSwiper = {
  uploadImages: connect(store, (state) => state.uploadImages),
  render: ({ uploadImages }) => html`
    <section class="img-swiper">
      <div class="img-swiper__inner-container">
        ${uploadImages.map(img => html`
          <div class="inner-container__img-item">
            <img src="${img}" class="img-item__image">
          </div>
        `)}
      </div>
    </section>
  `.style(style)
}

define('img-swiper', ImgSwiper)
