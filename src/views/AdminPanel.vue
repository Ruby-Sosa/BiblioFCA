<template>

  <!-- ==========================================================
       PÁGINA DE INICIO
       ========================================================== -->

  <section>


    <!-- ========================================================
         BIENVENIDA
         ======================================================== -->

    <div class="page-title">

      <div>

        <!-- Mostramos el nombre -->
        <h1>
          Bienvenido, {{ nombre }}
        </h1>

        <!-- Mostramos el rol -->
        <p>
          Has iniciado sesión como {{ rol }}.
        </p>

      </div>

    </div>


    <!-- ========================================================
         ADMINISTRADOR
         ======================================================== -->

    <!--
      Estas tarjetas únicamente aparecen
      para el Administrador.
    -->
    <div
      v-if="rol === 'Administrador'"
      class="cards-grid"
    >

      <div class="dashboard-card">

        <h3>
          Usuarios
        </h3>

        <strong>
          6
        </strong>

        <p>
          Usuarios registrados
        </p>

      </div>


      <div class="dashboard-card">

        <h3>
          Acervo
        </h3>

        <strong>
          4
        </strong>

        <p>
          Libros registrados
        </p>

      </div>


      <div class="dashboard-card">

        <h3>
          Disponibles
        </h3>

        <strong>
          3
        </strong>

        <p>
          Ejemplares disponibles
        </p>

      </div>


      <div class="dashboard-card">

        <h3>
          Alumnos
        </h3>

        <strong>
          2
        </strong>

        <p>
          Alumnos registrados
        </p>

      </div>

    </div>


    <!-- ========================================================
         BIBLIOTECARIO
         ======================================================== -->

    <div
      v-else-if="rol === 'Bibliotecario'"
      class="form-card"
    >

      <h3>
        Panel del bibliotecario
      </h3>

      <p>
        Puedes consultar el acervo bibliotecario
        y administrar la información de los alumnos.
      </p>

    </div>


    <!-- ========================================================
         ALUMNO
         ======================================================== -->

    <div
      v-else-if="rol === 'Alumno'"
      class="form-card"
    >

      <h3>
        Consulta de biblioteca
      </h3>

      <p>
        Puedes consultar los libros disponibles
        dentro del acervo bibliotecario.
      </p>

    </div>


    <!-- ========================================================
         MAESTRO
         ======================================================== -->

    <div
      v-else-if="rol === 'Maestro'"
      class="form-card"
    >

      <h3>
        Consulta para docentes
      </h3>

      <p>
        Puedes consultar el acervo disponible
        de la biblioteca.
      </p>

    </div>


    <!-- ========================================================
         EXTERNO
         ======================================================== -->

    <div
      v-else
      class="form-card"
    >

      <h3>
        Consulta de biblioteca
      </h3>

      <p>
        Puedes consultar el acervo bibliotecario disponible.
      </p>

    </div>

  </section>

</template>


<script setup lang="ts">

// ==========================================================
// INFORMACIÓN DEL USUARIO
// ==========================================================

/*
  Recuperamos el nombre guardado
  durante el inicio de sesión.
*/
const nombre =
  localStorage.getItem('nombre') || 'Usuario'


/*
  Recuperamos el rol.
*/
const rol =
  localStorage.getItem('rol') || 'Externo'

</script>