import '@styles/main.scss'
import logMessage from '@scripts/utils/hello-world'
import renderCube from '@scripts/cube'

const welcome = document.querySelector('[data-message]')
welcome.innerText = 'Welcome to the Vite Boilerplate for ThreeJS!'

logMessage('Welcome to the Vite Boilerplate for ThreeJS!')

renderCube()