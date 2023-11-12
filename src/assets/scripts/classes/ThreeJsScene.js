import * as THREE from 'three'
import { getAspectRatio, hasProperty } from '@scripts/utils/utils.js'
import AnimateScene from '@scripts/classes/AnimateScene.js'

class ThreeJsScene {
  constructor(config = {}) {
    //defaults for config
    const {
      background = 'black',
      mesh = {
        dims: [2, 2, 2],
        properties: {
          color: 'blue',
          wireframe: false,
        },
        rotation: {
          x: 0,
          y: 0,
        },
      },
      camera = {
        fov: 32,
        position: [0, 0, 8],
        aspect: {
          width: 800,
          height: 600
        },
      },
      renderer = {
        width: 800,
        height: 600
      },
    } = config

    //set from config if present, otherwise use defaults
    this.canvas = document.getElementById(config.canvas)

    if ( !this.canvas ) {
      console.error(`No canvas found with selector ${config.canvas}`)
      return
    }

    this.background = config.background || background
    this.mesh = config.mesh || mesh
    this.camera = config.camera || camera
    this.renderer = config.renderer || renderer

    this.ambientLight = hasProperty(config, 'ambientLight')
      ? config.ambientLight
      : false
    this.pointLight = hasProperty(config, 'pointLight')
      ? config.pointLight
      : false

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(this.background)
  }
  
  setMesh() {
    const { dims, properties, rotation } = this.mesh
    const geometry = new THREE.BoxGeometry(...dims)
    const material = new THREE.MeshStandardMaterial(properties)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.set(rotation.x, rotation.y, rotation.z = 0)

    return mesh
  }

  setCamera() {
    const { fov, position, aspect } = this.camera
    const camera = new THREE.PerspectiveCamera(fov, getAspectRatio(aspect))
    camera.position.set(...position)

    return camera
  }

  setAmbientLight() {
    const { color, intensity } = this.ambientLight
    const light = new THREE.AmbientLight(color, intensity)

    return light
  }

  setPointLight() {
    const { position, color, intensity, distance, decay } = this.pointLight
    const light = new THREE.PointLight(color, intensity, distance, decay)
    light.position.set(...position)

    return light
  }

  setRender() {
    const { width, height } = this.renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    })
    renderer.setSize(width, height)

    return renderer
  }

  init() {
    this.mesh = this.setMesh()
    this.camera = this.setCamera()
    
    this.scene.add(this.mesh, this.camera)
    
    if ( this.pointLight ) {
      const pointLight = this.setPointLight()
      this.scene.add(pointLight)
    }
    
    if ( this.ambientLight ) {
      const ambientLight = this.setAmbientLight()
      this.scene.add(ambientLight)
    }
    
    this.renderer = this.setRender()

    const assets = {
      canvas: this.canvas,
      scene: this.scene,
      mesh: this.mesh,
      camera: this.camera,
      renderer: this.renderer,
    }

    this.animateScene = new AnimateScene(assets).init()
    return this
  }
}

export default ThreeJsScene