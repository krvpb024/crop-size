import { html, svg, define } from 'hybrids'
import { store } from '../store'
import { updateBoundingBox } from '../store/actions'
import fs from 'fs'
const style = fs.readFileSync(__dirname + '/imgCanvas.css', 'utf8')

const getMousePositionRelativeToElemet = (element) => {
  const rect = element.currentTarget.getBoundingClientRect()
  const x = element.clientX - rect.left
  const y = element.clientY - rect.top
  return [x, y]
}

const onclickHandler = (host, e) => {
  const [x, y] = getMousePositionRelativeToElemet(e)
  if (host.cropping !== 'start') {
    host.startPosition = { x, y }
    host.mousePosition = { x, y }
    host.cropping = 'start'
  } else {
    host.cropping = 'hold'
    store.dispatch(updateBoundingBox(host.normalizedBoundingBox))
  }
}

const onmousemoveHandler = (host, e) => {
  if (host.cropping !== 'start') return
  const [x, y] = getMousePositionRelativeToElemet(e)
  host.mousePosition = { x, y }
}

const fixToOne = num => Number(num.toFixed(1))

const getPercentage = (a, b) => a / b

const ImgCanvas = {
  // props
  displayImage: {
    set: (host, value, lastValue) => {
      host.cropping = 'stop'
      return value
    }
  },
  // data
  cropping: 'stop',
  startPosition: { x: 0, y: 0 },
  mousePosition: { x: 0, y: 0 },
  boundingBox: ({ startPosition, mousePosition }) => {
    const x = fixToOne(Math.min(startPosition.x, mousePosition.x))
    const y = fixToOne(Math.min(startPosition.y, mousePosition.y))
    const endX = fixToOne(Math.max(startPosition.x, mousePosition.x))
    const endY = fixToOne(Math.max(startPosition.y, mousePosition.y))
    const width = fixToOne(endX - x)
    const height = fixToOne(endY - y)
    return { x, y, endX, endY, width, height }
  },
  normalizedBoundingBox: ({ boundingBox: { x, y, endX, endY, width, height } }) => {
    const { offsetWidth, offsetHeight } = store.getState().imageSize
    return {
      x: getPercentage(x, offsetWidth),
      y: getPercentage(y, offsetHeight),
      endX: getPercentage(endX, offsetWidth),
      endY: getPercentage(endY, offsetHeight),
      width: getPercentage(width, offsetWidth),
      height: getPercentage(height, offsetHeight)
    }
  },
  // render
  render: ({
    displayImage,
    cropping,
    boundingBox: { x, y, width, height }
  }) => html`
    <svg class="img-canvas" onclick="${onclickHandler}" onmousemove="${onmousemoveHandler}">
      ${cropping !== 'stop' && svg`
        <rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="blue" fill="purple" fill-opacity="0.5" stroke-opacity="0.8"/>
      `}
    </svg>
    <style>
    .img-canvas {
      width: ${displayImage.offsetWidth}px;
      height: ${displayImage.offsetHeight}px;
    }
    </style>
  `.style(style)
}

define('img-canvas', ImgCanvas)
