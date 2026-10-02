<template>

  <!-- Contenedor general del panel -->
  <div class="panel">

    <!-- Barra lateral -->
    <aside class="sidebar">

      <!-- Nombre del sistema -->
      <div class="logo">

        <h2>BiblioFCA</h2>

        <p>Biblioteca FCA</p>

      </div>

      <!-- Menú principal -->
      <nav>

        <!-- Página principal -->
        <RouterLink to="/panel">
          Inicio
        </RouterLink>

        <!-- Gestión de usuarios -->
        <RouterLink to="/panel/usuarios">
          Usuarios
        </RouterLink>

        <!-- Gestión de libros -->
        <RouterLink to="/panel/acervo">
          Acervo bibliotecario
        </RouterLink>

        <!-- Validación de alumnos -->
        <RouterLink to="/panel/alumnos">
          Alumnos
        </RouterLink>

        <!-- Roles -->
        <RouterLink to="/panel/roles">
          Roles
        </RouterLink>

      </nav>

      <!-- Botón para cerrar sesión -->
      <button
        class="logout"
        @click="cerrarSesion"
      >
        Cerrar sesión
      </button>

    </aside>

    <!-- Área donde aparecerán las diferentes vistas -->
    <main class="contenido">

      <!-- Encabezado -->
      <HeaderComponent />

      <!--
        Aquí Vue Router coloca automáticamente
        UsuariosView, SistemasView, AlumnosView, etc.
      -->
      <RouterView />

    </main>

  </div>

</template>

<script setup lang="ts">

// Importamos RouterView y RouterLink.
import {
  RouterView,
  RouterLink,
  useRouter
} from 'vue-router'

// Importamos nuestro encabezado.
import HeaderComponent from '../components/HeaderComponent.vue'

// Creamos acceso al router.
const router = useRouter()

// Función para cerrar sesión.
const cerrarSesion = () => {

  // Eliminamos los datos de sesión.
  localStorage.removeItem('sesion')
  localStorage.removeItem('rol')

  // Regresamos al Login.
  router.push('/')

}

</script>