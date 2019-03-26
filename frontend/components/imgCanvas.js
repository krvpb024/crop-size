import { html, svg, define } from 'hybrids'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgCanvas.css', 'utf8')

const onclickHandler = (host, e) => {
  const rect = e.target.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  console.log(x, y)
  // host.crops = [...host.crops, { cx: 50, cy: 60, r: 90 }]
}

const ImgCanvas = {
  displayImage: {},
  crops: [],
  render: ({ displayImage, crops }) => {
    return html`
    <svg class="img-canvas" onclick="${onclickHandler}">
      ${crops.map(({ cx, cy, r }) => svg`<circle cx="${cx}" cy="${cy}" r="${r}" />`)}
    </svg>

    <style>
    .img-canvas {
      width: ${displayImage.offsetWidth}px;
      height: ${displayImage.offsetHeight}px;
    }
    </style>
  `.style(style)
  }
}

define('img-canvas', ImgCanvas)
