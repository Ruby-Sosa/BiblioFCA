// Importamos las funciones necesarias de Vue Router.
// createRouter crea el enrutador de la aplicación.
// createWebHistory permite utilizar rutas normales como /panel/usuarios.
import { createRouter, createWebHistory } from 'vue-router'

// Importamos las vistas que utilizaremos en el sistema.
import LoginView from '../views/LoginView.vue'
import Panel from '../views/panel.vue'
import AdminPanel from '../views/AdminPanel.vue'
import UsuariosView from '../views/UsuariosView.vue'
import SistemasView from '../views/SistemasView.vue'
import RolesView from '../views/RolesView.vue'
import AlumnosView from '../views/AlumnosView.vue'

// Creamos todas las rutas disponibles en nuestra aplicación.
const routes = [

  // Ruta principal.
  // Cuando el usuario entre al sistema se mostrará el Login.
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  // Ruta principal del panel.
  {
    path: '/panel',
    component: Panel,

    // Estas rutas se mostrarán dentro del panel.
    children: [

      // Página de inicio del panel.
      {
        path: '',
        name: 'inicio',
        component: AdminPanel
      },

      // Módulo de gestión de usuarios.
      {
        path: 'usuarios',
        name: 'usuarios',
        component: UsuariosView
      },

      // Módulo del acervo bibliotecario.
      // Reutilizamos SistemasView.vue.
      {
        path: 'acervo',
        name: 'acervo',
        component: SistemasView
      },

      // Módulo para validar alumnos.
      {
        path: 'alumnos',
        name: 'alumnos',
        component: AlumnosView
      },

      // Módulo de roles.
      {
        path: 'roles',
        name: 'roles',
        component: RolesView
      }

    ]
  }

]

// Creamos el router utilizando el historial del navegador.
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Exportamos el router para utilizarlo desde main.ts.
export default router