// ==========================================================
// IMPORTACIONES DE VUE ROUTER
// ==========================================================

import {
  createRouter,
  createWebHistory
} from 'vue-router'


// ==========================================================
// IMPORTAR LAS VISTAS
// ==========================================================

// Pantalla del Login.
import LoginView from '../views/LoginView.vue'

// Estructura principal del panel.
import Panel from '../views/panel.vue'

// Página inicial del panel.
import AdminPanel from '../views/AdminPanel.vue'

// Gestión de usuarios.
import UsuariosView from '../views/UsuariosView.vue'

// Acervo bibliotecario.
import SistemasView from '../views/SistemasView.vue'

// Validación/gestión de alumnos.
import AlumnosView from '../views/AlumnosView.vue'

// Administración de roles.
import RolesView from '../views/RolesView.vue'


// ==========================================================
// CREAR ROUTER
// ==========================================================

const router = createRouter({

  /*
    createWebHistory permite utilizar URLs normales.

    Ejemplo:
    /panel/usuarios
  */
  history: createWebHistory(
    import.meta.env.BASE_URL
  ),


  // ========================================================
  // RUTAS DEL SISTEMA
  // ========================================================

  routes: [


    // ======================================================
    // LOGIN
    // ======================================================

    {
      path: '/',

      name: 'login',

      component: LoginView
    },


    // ======================================================
    // PANEL
    // ======================================================

    {
      path: '/panel',

      component: Panel,


      /*
        meta.requiresAuth indica que para entrar
        a esta sección debe existir una sesión.
      */
      meta: {
        requiresAuth: true
      },


      // ====================================================
      // RUTAS INTERNAS DEL PANEL
      // ====================================================

      children: [


        // --------------------------------------------------
        // INICIO
        // --------------------------------------------------

        /*
          Todos los usuarios autenticados pueden
          visualizar el inicio.
        */
        {
          path: '',

          name: 'inicio',

          component: AdminPanel,

          meta: {

            requiresAuth: true,

            roles: [
              'Administrador',
              'Bibliotecario',
              'Maestro',
              'Alumno',
              'Externo'
            ]

          }
        },


        // --------------------------------------------------
        // USUARIOS
        // --------------------------------------------------

        /*
          Únicamente el Administrador
          puede entrar aquí.
        */
        {
          path: 'usuarios',

          name: 'usuarios',

          component: UsuariosView,

          meta: {

            requiresAuth: true,

            roles: [
              'Administrador'
            ]

          }
        },


        // --------------------------------------------------
        // ACERVO
        // --------------------------------------------------

        /*
          Todos los tipos de usuario pueden
          consultar el acervo.
        */
        {
          path: 'acervo',

          name: 'acervo',

          component: SistemasView,

          meta: {

            requiresAuth: true,

            roles: [
              'Administrador',
              'Bibliotecario',
              'Maestro',
              'Alumno',
              'Externo'
            ]

          }
        },


        // --------------------------------------------------
        // ALUMNOS
        // --------------------------------------------------

        /*
          Únicamente Administrador y Bibliotecario
          pueden acceder a este módulo.
        */
        {
          path: 'alumnos',

          name: 'alumnos',

          component: AlumnosView,

          meta: {

            requiresAuth: true,

            roles: [
              'Administrador',
              'Bibliotecario'
            ]

          }
        },


        // --------------------------------------------------
        // ROLES
        // --------------------------------------------------

        /*
          Únicamente el Administrador puede
          administrar roles.
        */
        {
          path: 'roles',

          name: 'roles',

          component: RolesView,

          meta: {

            requiresAuth: true,

            roles: [
              'Administrador'
            ]

          }
        }

      ]
    }

  ]

})


// ==========================================================
// GUARD DE NAVEGACIÓN
// ==========================================================

/*
  beforeEach se ejecuta ANTES de permitir
  cualquier cambio de página.

  Aquí verificaremos:

  1. Si existe una sesión.
  2. Qué rol tiene el usuario.
  3. Si ese rol tiene permiso para entrar.
*/
router.beforeEach((to) => {


  // ========================================================
  // OBTENER SESIÓN
  // ========================================================

  /*
    Recuperamos la información guardada
    durante el Login.
  */
  const sesion =
    localStorage.getItem('sesion')


  const rol =
    localStorage.getItem('rol')


  // ========================================================
  // COMPROBAR SI LA RUTA NECESITA LOGIN
  // ========================================================

  /*
    matched revisa también las rutas padre.

    Esto es importante porque las rutas
    están dentro de /panel.
  */
  const necesitaAutenticacion =
    to.matched.some(

      ruta =>
        ruta.meta.requiresAuth

    )


  // ========================================================
  // USUARIO SIN SESIÓN
  // ========================================================

  /*
    Si intenta entrar al panel sin haber
    iniciado sesión, regresamos al Login.
  */
  if (
    necesitaAutenticacion &&
    sesion !== 'activa'
  ) {

    return '/'

  }


  // ========================================================
  // OBTENER ROLES PERMITIDOS
  // ========================================================

  /*
    Buscamos dentro de las rutas coincidentes
    cuál tiene definida una lista de roles.
  */
  const rutaConRoles =
    [...to.matched]
      .reverse()
      .find(
        ruta =>
          Array.isArray(ruta.meta.roles)
      )


  /*
    Convertimos los roles permitidos
    a un arreglo de strings.
  */
  const rolesPermitidos =
    rutaConRoles?.meta.roles as string[] | undefined


  // ========================================================
  // VALIDAR PERMISOS
  // ========================================================

  /*
    Si la página tiene roles permitidos
    y el rol actual NO se encuentra en esa lista,
    bloqueamos el acceso.
  */
  if (
    rolesPermitidos &&
    (
      !rol ||
      !rolesPermitidos.includes(rol)
    )
  ) {

    /*
      Regresamos al Inicio del panel.
    */
    return '/panel'

  }


  // ========================================================
  // EVITAR VOLVER AL LOGIN CON SESIÓN ACTIVA
  // ========================================================

  /*
    Si ya inició sesión e intenta regresar
    manualmente al Login, lo enviamos nuevamente
    al panel.
  */
  if (
    to.path === '/' &&
    sesion === 'activa'
  ) {

    return '/panel'

  }


  /*
    Si ninguna condición bloqueó el acceso,
    Vue Router permite continuar normalmente.
  */
  return true

})


// ==========================================================
// EXPORTAR ROUTER
// ==========================================================

export default router