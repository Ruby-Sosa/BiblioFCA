<template>

  <!-- ==========================================================
       ESTRUCTURA GENERAL DEL PANEL
       ========================================================== -->

  <div class="panel-layout">


    <!-- ========================================================
         MENÚ LATERAL
         ======================================================== -->

    <aside class="sidebar">


      <!-- NOMBRE DEL SISTEMA -->
      <div class="sidebar-brand">

        <h2>
          BiblioFCA
        </h2>

        <p>
          Biblioteca FCA
        </p>

      </div>


      <!-- ======================================================
           MENÚ
           ====================================================== -->

      <nav class="sidebar-menu">


        <!-- ====================================================
             INICIO
             ==================================================== -->

        <!--
          Todos los usuarios pueden entrar a Inicio.
        -->
        <RouterLink
          to="/panel"
        >
          Inicio
        </RouterLink>


        <!-- ====================================================
             USUARIOS
             ==================================================== -->

        <!--
          SOLO el Administrador puede administrar usuarios.

          Si el rol no es Administrador,
          Vue ni siquiera mostrará esta opción.
        -->
        <RouterLink
          v-if="rol === 'Administrador'"
          to="/panel/usuarios"
        >
          Usuarios
        </RouterLink>


        <!-- ====================================================
             ACERVO
             ==================================================== -->

        <!--
          Todos pueden consultar el acervo.

          Más adelante podemos hacer que únicamente
          Administrador y Bibliotecario puedan modificarlo.
        -->
        <RouterLink
          to="/panel/acervo"
        >
          Acervo bibliotecario
        </RouterLink>


        <!-- ====================================================
             ALUMNOS
             ==================================================== -->

        <!--
          Esta opción solamente aparece para:

          Administrador
          Bibliotecario
        -->
        <RouterLink
          v-if="
            rol === 'Administrador' ||
            rol === 'Bibliotecario'
          "
          to="/panel/alumnos"
        >
          Alumnos
        </RouterLink>


        <!-- ====================================================
             ROLES
             ==================================================== -->

        <!--
          La configuración de roles solamente
          puede ser utilizada por el Administrador.
        -->
        <RouterLink
          v-if="rol === 'Administrador'"
          to="/panel/roles"
        >
          Roles
        </RouterLink>

      </nav>


      <!-- ======================================================
           USUARIO ACTUAL
           ====================================================== -->

      <div class="sidebar-user">

        <!-- Nombre de la persona -->
        <strong>
          {{ nombre }}
        </strong>

        <!-- Rol -->
        <p>
          {{ rol }}
        </p>

      </div>


      <!-- ======================================================
           CERRAR SESIÓN
           ====================================================== -->

      <button
        class="logout-button"
        @click="cerrarSesion"
      >
        Cerrar sesión
      </button>

    </aside>


    <!-- ========================================================
         CONTENIDO
         ======================================================== -->

    <main class="panel-content">

      <!--
        RouterView cambia el contenido dependiendo
        de la opción seleccionada.

        Ejemplo:

        /panel/usuarios
        muestra UsuariosView.vue

        /panel/acervo
        muestra SistemasView.vue
      -->
      <RouterView />

    </main>

  </div>

</template>


<script setup lang="ts">

// ==========================================================
// IMPORTACIONES
// ==========================================================

import {
  RouterLink,
  RouterView,
  useRouter
} from 'vue-router'


// ==========================================================
// ROUTER
// ==========================================================

const router = useRouter()


// ==========================================================
// INFORMACIÓN DEL USUARIO
// ==========================================================

/*
  Recuperamos del navegador el nombre
  de la persona que inició sesión.
*/
const nombre =
  localStorage.getItem('nombre') || 'Usuario'


/*
  Recuperamos su rol.

  Ejemplos:

  Administrador
  Bibliotecario
  Maestro
  Alumno
  Externo
*/
const rol =
  localStorage.getItem('rol') || 'Externo'


// ==========================================================
// CERRAR SESIÓN
// ==========================================================

const cerrarSesion = () => {

  /*
    Eliminamos todos los datos relacionados
    con la sesión actual.
  */
  localStorage.removeItem('sesion')

  localStorage.removeItem('nombre')

  localStorage.removeItem('correo')

  localStorage.removeItem('rol')


  /*
    Regresamos al Login.
  */
  router.push('/')

}

</script>