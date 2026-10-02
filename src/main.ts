// ==========================================================
// IMPORTACIONES
// ==========================================================

// Importamos la función para crear nuestra aplicación Vue.
import { createApp } from 'vue'

// Importamos el componente principal.
import App from './App.vue'

// Importamos nuestro router.
import router from './router'

// IMPORTANTE:
// Aquí cargamos todos los estilos generales de BiblioFCA.
import './style.css'


// ==========================================================
// CREAR APLICACIÓN
// ==========================================================

// Creamos la aplicación.
const app = createApp(App)


// ==========================================================
// ACTIVAR ROUTER
// ==========================================================

// Permitimos que la aplicación utilice Vue Router.
app.use(router)


// ==========================================================
// MONTAR APLICACIÓN
// ==========================================================

// Mostramos la aplicación dentro del elemento #app
// que se encuentra en index.html.
app.mount('#app')