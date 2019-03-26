import { html, define } from 'hybrids'
import { store } from '../store'
import './imgSwiperItem'
import { connect } from '../utils/factories'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgSwiper.css', 'utf8')

export const ImgSwiper = {
  uploadImages: connect(store, (state) => state.uploadImages),
  render: ({ uploadImages }) => html`
    <section class="img-swiper">
      <div class="img-swiper__inner-container">
        ${uploadImages.map(img => html`
        <img-swiper-item image="${img}"></img-swiper-item>
        `)}
      </div>
    </section>
  `.style(style)
}

define('img-swiper', ImgSwiper)
