// Importamos createApp para crear nuestra aplicación Vue.
import { createApp } from 'vue'

// Importamos el componente principal.
import App from './App.vue'

// Importamos nuestro archivo de rutas.
import router from './router'

// Importamos los estilos generales del sistema.
import './style.css'

// Creamos la aplicación.
const app = createApp(App)

// Indicamos que nuestra aplicación utilizará Vue Router.
app.use(router)

// Montamos la aplicación en el elemento con id "app"
// que se encuentra dentro de index.html.
app.mount('#app')