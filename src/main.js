import '@styles/main.scss'
import ThreeJsScene from '@scripts/classes/ThreeJsScene.js'
import controls from '@scripts/controls.js'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const sceneConfig = {
  canvas: 'threejs-cube',
  background: 'white',
  mesh: {
    dims: [1, 1, 1],
    properties: {
      color: 'cyan',
      wireframe: false,
      roughness: 0.5,
      metalness: 0.5,
    },
    rotation: {
      x: Math.PI * 0.175,
      y: Math.PI * 0.25,
    }
  },
  camera: {
    fov: 75,
    position: [0, 0, 2],
    aspect: {
      width: sizes.width,
      height: sizes.height,
    }
  },
  renderer: {
    width: sizes.width,
    height: sizes.height,
  },
  ambientLight: {
    color: '#ffffff',
    intensity: 0.5,
  },
  pointLight: {
    position: [1, 2, 1],
    color: 'white',
    intensity: 10,
    distance: 500,
    decay: 2,
  }
}
const SCENE = new ThreeJsScene(sceneConfig).init()