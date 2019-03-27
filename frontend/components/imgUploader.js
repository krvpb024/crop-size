import { html, define } from 'hybrids'
import { store } from '../store'
import { uploadImages } from '../store/actions'
import uploadIcon from '../assets/icon/square-upload.svg'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgUploader.css', 'utf8')

const dragoverHandler = (host, e) => {
  e.preventDefault()
  host.dragoverActive = true
}
const dragleaveHandler = (host, e) => {
  host.dragoverActive = false
}

const transferFileToDataUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      resolve(e.target.result)
    })
    reader.readAsDataURL(file)
  })
}

const dropHandler = async (host, ev) => {
  ev.preventDefault()
  if (!ev.dataTransfer.files) return

  host.dragoverActive = false
  const isImageType = file => file.type.startsWith('image/')
  const files = Array.from(ev.dataTransfer.files).filter(isImageType)

  const result = await Promise.all(files.map(transferFileToDataUrl))
  store.dispatch(uploadImages(result))
}

const onchangeHander = async (host, e) => {
  const files = Array.from(host.shadowRoot.querySelector('.dropzone__input').files)

  const result = await Promise.all(files.map(transferFileToDataUrl))
  store.dispatch(uploadImages(result))
}

const ImgUploader = {
  dragoverActive: false,
  render: ({ dragoverActive }) => html`
    <section class="img-uploader">
      <label
        class="${{ 'img-uploader__dropzone': true, 'img-uploader__dropzone--active': dragoverActive }}"
        ondrop="${dropHandler}"
        ondragover="${dragoverHandler}"
        ondragleave="${dragleaveHandler}"
        for="file"
      >
        <img src="${uploadIcon}">
        <input
          class="dropzone__input"
          type="file"
          id="file"
          name="file"
          accept="image/*"
          hidden
          multiple
          onchange=${onchangeHander}>
      </label>
    </section>
  `.style(style)
}

define('img-uploader', ImgUploader)
