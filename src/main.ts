import { once, showUI } from '@create-figma-plugin/utilities'

export default function () {
  once('SAVE_CLASS', function (data) {
    console.log('Received data:', data)
  })

  showUI({
    height: 480,
    width: 320
  })
} 