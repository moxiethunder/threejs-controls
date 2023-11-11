import * as THREE from 'three'
import { getAspectRatio, getCanvas } from './utils/utils.js'

function renderCube() {
  const cubeCanvas = getCanvas('cube')

  const scene = new THREE.Scene()
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  const sizes = {
    width: 800,
    height: 600
  }

  const camera = new THREE.PerspectiveCamera(75, getAspectRatio(sizes))
  camera.position.z = 3
  scene.add(camera)

  if ( cubeCanvas ) {
    const renderer = new THREE.WebGLRenderer({
      canvas: cubeCanvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
  } else {
    console.error('No canvas found with data-render="cube"')
  }
}

export default renderCube