import { html, define } from 'hybrids'
import { store } from '../store'
import { uploadImages } from '../store/actions'
import fs from 'fs'
// eslint-disable-next-line no-path-concat
const style = fs.readFileSync(__dirname + '/imgUploader.css', 'utf8')

const dragoverHandler = (host, e) => {
  e.preventDefault()
  host.dragoverActive = true
}
const dragleaveHandler = (host, e) => {
  host.dragoverActive = false
}
const dropHandler = async (host, ev) => {
  ev.preventDefault()
  if (!ev.dataTransfer.files) return

  host.dragoverActive = false
  const isImageType = file => file.type.startsWith('image/')
  const files = Array.from(ev.dataTransfer.files).filter(isImageType)

  const transferFileToDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        resolve(e.target.result)
      })
      reader.readAsDataURL(file)
    })
  }

  const result = await Promise.all(files.map(transferFileToDataUrl))
  store.dispatch(uploadImages(result))
}

const ImgUploader = {
  dragoverActive: false,
  render: ({ dragoverActive }) => html`
    <section class="img-uploader">
      <div class="img-uploader__dropzone ${dragoverActive ? 'img-uploader__dropzone--active' : ''}"
        ondrop="${dropHandler}"
        ondragover="${dragoverHandler}"
        ondragleave="${dragleaveHandler}"
      >
        <p>Files<br>Dropzone</p>
      </div>
    </section>
  `.style(style)
}

define('img-uploader', ImgUploader)
