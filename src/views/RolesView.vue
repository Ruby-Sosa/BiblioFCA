<template>

  <!-- ==========================================================
       ADMINISTRACIÓN DE ROLES
       ========================================================== -->

  <section>


    <!-- TÍTULO -->
    <div class="page-title">

      <div>

        <h1>
          Roles y permisos
        </h1>

        <p>
          Consulta los permisos asignados a cada
          tipo de usuario de BiblioFCA.
        </p>

      </div>

    </div>


    <!-- ========================================================
         TABLA DE ROLES
         ======================================================== -->

    <div class="table-container">

      <table>

        <thead>

          <tr>

            <th>
              Rol
            </th>

            <th>
              Inicio
            </th>

            <th>
              Usuarios
            </th>

            <th>
              Acervo
            </th>

            <th>
              Alumnos
            </th>

            <th>
              Roles
            </th>

          </tr>

        </thead>


        <tbody>

          <!--
            Generamos una fila por cada rol.
          -->
          <tr
            v-for="rol in roles"
            :key="rol.nombre"
          >

            <td>
              <strong>
                {{ rol.nombre }}
              </strong>
            </td>

            <td>
              {{ rol.inicio }}
            </td>

            <td>
              {{ rol.usuarios }}
            </td>

            <td>
              {{ rol.acervo }}
            </td>

            <td>
              {{ rol.alumnos }}
            </td>

            <td>
              {{ rol.roles }}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </section>

</template>


<script setup lang="ts">

// ==========================================================
// PERMISOS POR ROL
// ==========================================================

/*
  Esta tabla sirve para mostrar de manera visual
  qué puede utilizar cada tipo de usuario.
*/
const roles = [

  {
    nombre: 'Administrador',
    inicio: 'Sí',
    usuarios: 'Sí',
    acervo: 'Administrar',
    alumnos: 'Sí',
    roles: 'Sí'
  },

  {
    nombre: 'Bibliotecario',
    inicio: 'Sí',
    usuarios: 'No',
    acervo: 'Administrar',
    alumnos: 'Sí',
    roles: 'No'
  },

  {
    nombre: 'Maestro',
    inicio: 'Sí',
    usuarios: 'No',
    acervo: 'Consultar',
    alumnos: 'No',
    roles: 'No'
  },

  {
    nombre: 'Alumno',
    inicio: 'Sí',
    usuarios: 'No',
    acervo: 'Consultar',
    alumnos: 'No',
    roles: 'No'
  },

  {
    nombre: 'Externo',
    inicio: 'Sí',
    usuarios: 'No',
    acervo: 'Consultar',
    alumnos: 'No',
    roles: 'No'
  }

]

</script>