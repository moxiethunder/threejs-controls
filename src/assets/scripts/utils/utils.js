export function getAspectRatio(config) {
  return config.width / config.height
}

export function getCanvas(value) {
  const allCanvases = Array.from(document.querySelectorAll('[data-render]'))

  return allCanvases.find(canvas => canvas.dataset.render === value)
}

export function getDeltaTime(time) {
  const currentTime = Date.now()
  const deltaTime = currentTime - time

  return {
    currentTime,
    deltaTime
  }
}