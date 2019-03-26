import 'normalize.css'
import { html, define } from 'hybrids'
import '@babel/polyfill'
import '../components/imgDisplay'
import '../components/imgInfo'
import '../components/imgUploader'
import '../components/imgSwiper'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/index.css', 'utf8')

export const IndexApp = {
  render: () => html`
    <h1 class="app__title">Crop Size</h1>
    <img-display class="app__img-display"></img-display>
    <img-info class="app__img-info"></img-info>
    <img-uploader class="app__img-uploader"></img-uploader>
    <img-swiper class="app__img-swiper"></img-swiper>
  `.style(style)
}

define('index-app', IndexApp)
