import * as THREE from 'three'
import gsap from 'gsap'

class AnimateScene {
  constructor(config) {
    this.canvas = config.canvas
    this.scene = config.scene
    this.mesh = config.mesh
    this.camera = config.camera
    this.renderer = config.renderer

    this.vars = {
      DELAY: 250,
      VELOCITY: Math.PI * 0.1,
      isDragging: false,
      isRotating: true,
      rotationPosition: { x: 0, y: 0 },
      previousMousePosition: { x: 0, y: 0 },
      clock: new THREE.Clock(),
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    if (!this.vars.isDragging && this.vars.isRotating) {
      const elapsedTime = this.vars.clock.getElapsedTime()

      this.mesh.rotation.x = this.vars.rotationPosition.x + elapsedTime * this.vars.VELOCITY
      this.mesh.rotation.y = this.vars.rotationPosition.y + elapsedTime * this.vars.VELOCITY
    }

    this.renderer.render(this.scene, this.camera);
  }

  onMouseDown(e) {
    this.vars.isDragging = true
    this.vars.isRotating = false
    this.vars.previousMousePosition = { x: e.offsetX, y: e.offsetY }
    this.vars.rotationPosition = { x: this.mesh.rotation.x, y: this.mesh.rotation.y }
    this.canvas.setAttribute('data-grabbing', '')
  }

  onMouseMove(e) {
    if ( this.vars.isDragging ) {
      let deltaMove = {
        x: e.offsetX - this.vars.previousMousePosition.x,
        y: e.offsetY - this.vars.previousMousePosition.y
      }

      let rotateAngleX = (deltaMove.y / window.innerHeight) * Math.PI * 2
      let rotateAngleY = (deltaMove.x / window.innerWidth) * Math.PI * 2

      gsap.to(this.mesh.rotation, {
        x: this.vars.rotationPosition.x + rotateAngleX,
        y: this.vars.rotationPosition.y + rotateAngleY,
        duration: 1,
      })
    }
  }

  onMouseUp() {
    this.vars.isDragging = false
    this.canvas.removeAttribute('data-grabbing')
    setTimeout(() => {
      this.vars.clock = new THREE.Clock()
      this.vars.rotationPosition = { x: this.mesh.rotation.x, y: this.mesh.rotation.y }
      this.vars.isRotating = true
    }, this.vars.DELAY)
  }

  init() {
    const eventHandlers = {
      mousedown: this.onMouseDown.bind(this),
      mousemove: this.onMouseMove.bind(this),
      mouseup: this.onMouseUp.bind(this),
    }

    Object.keys(eventHandlers).forEach(event => {
      document.addEventListener(event, eventHandlers[event])
    })

    this.animate()
  }
}

export default AnimateScene