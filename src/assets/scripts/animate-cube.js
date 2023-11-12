import * as THREE from 'three';
import { getDeltaTime } from './utils/utils.js';

function animateCube(assets) {
  const { renderer, scene, camera, mesh, cubeCanvas } = assets
  let isDragging = false
  let isRotating = true
  let rotation = null
  let delay = 250
  let time = Date.now()
  let previousMousePosition = {
    x: 0,
    y: 0
  }

  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  animate()
  
  function animate() {
    requestAnimationFrame(animate)

    if (!isDragging && isRotating) {
      const { currentTime, deltaTime } = getDeltaTime(time);
      time = currentTime;

      mesh.rotation.x -= 0.00025 * deltaTime;
      mesh.rotation.y += 0.00025 * deltaTime;
    }

    renderer.render(scene, camera);
  }

  function onMouseDown(e) {
    isDragging = true
    isRotating = false
    previousMousePosition = { x: e.offsetX, y: e.offsetY }
    cubeCanvas.setAttribute('data-grabbing', '')
  }

  function onMouseMove(e) {
    if ( isDragging ) {
      let deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      }

      let rotateAngleX = (deltaMove.y / window.innerHeight) * Math.PI * 2
      let rotateAngleY = (deltaMove.x / window.innerWidth) * Math.PI * 2

      mesh.rotation.x += rotateAngleX
      mesh.rotation.y += rotateAngleY
    }

    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  function onMouseUp() {
    isDragging = false
    cubeCanvas.removeAttribute('data-grabbing')
    setTimeout(() => {
      time = Date.now()
      isRotating = true
    }, delay)
  }
}

export default animateCube;