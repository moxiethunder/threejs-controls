import * as THREE from 'three'
import { getAspectRatio, getCanvas } from './utils/utils.js'
import animateCube from './animate-cube.js'

function renderCube() {
  const cubeCanvas = getCanvas('cube')

  const scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.rotation.y = Math.PI * 0.25

  scene.add(mesh)

  const light = new THREE.PointLight(0xffffff, 6, 500, 2)
  light.position.set(1, 2, 1)
  light.castShadow = true
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight); 
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  
  const camera = new THREE.PerspectiveCamera(75, getAspectRatio(sizes))
  camera.position.z = 2
  scene.add(camera)

  if ( cubeCanvas ) {
    const renderer = new THREE.WebGLRenderer({
      canvas: cubeCanvas
    })

    renderer.setSize(sizes.width, sizes.height)

    const assets = {
      renderer,
      scene,
      camera,
      mesh,
      cubeCanvas
    }

    animateCube(assets)

  } else {
    console.error('No canvas found with data-render="cube"')
  }
}

export default renderCube