<template>

  <!-- ==========================================================
       GESTIÓN DE USUARIOS
       ========================================================== -->

  <section>


    <!-- ENCABEZADO -->
    <div class="page-title">

      <div>

        <h1>
          Gestión de usuarios
        </h1>

        <p>
          Administra los usuarios internos y externos
          de BiblioFCA.
        </p>

      </div>


      <!-- Mostrar formulario -->
      <button
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        Agregar usuario
      </button>

    </div>


    <!-- ========================================================
         FORMULARIO
         ======================================================== -->

    <div
      v-if="mostrarFormulario"
      class="form-card"
    >

      <h3>
        Nuevo usuario
      </h3>


      <div class="form-grid">


        <!-- Nombre -->
        <input
          v-model="nuevoUsuario.nombre"
          type="text"
          placeholder="Nombre completo"
        />


        <!-- Correo -->
        <input
          v-model="nuevoUsuario.correo"
          type="email"
          placeholder="Correo electrónico"
        />


        <!-- Contraseña -->
        <input
          v-model="nuevoUsuario.password"
          type="password"
          placeholder="Contraseña"
        />


        <!-- Rol -->
        <select
          v-model="nuevoUsuario.tipo"
        >

          <option value="">
            Selecciona un tipo
          </option>

          <option value="Administrador">
            Administrador
          </option>

          <option value="Bibliotecario">
            Bibliotecario
          </option>

          <option value="Maestro">
            Maestro
          </option>

          <option value="Alumno">
            Alumno
          </option>

          <option value="Externo">
            Externo
          </option>

        </select>

      </div>


      <!-- BOTONES -->
      <div class="form-actions">

        <button
          class="btn-primary"
          @click="agregarUsuario"
        >
          Guardar
        </button>


        <button
          class="btn-secondary"
          @click="cancelarFormulario"
        >
          Cancelar
        </button>

      </div>

    </div>


    <!-- ========================================================
         TABLA
         ======================================================== -->

    <div class="table-container">

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Correo</th>

            <th>Rol</th>

            <th>Acciones</th>

          </tr>

        </thead>


        <tbody>

          <tr
            v-for="usuario in usuarios"
            :key="usuario.id"
          >

            <td>
              {{ usuario.id }}
            </td>

            <td>
              {{ usuario.nombre }}
            </td>

            <td>
              {{ usuario.correo }}
            </td>

            <td>

              <span class="badge">
                {{ usuario.tipo }}
              </span>

            </td>

            <td>

              <button
                class="btn-danger"
                @click="eliminarUsuario(usuario.id)"
              >
                Eliminar
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </section>

</template>


<script setup lang="ts">

// ==========================================================
// IMPORTACIONES
// ==========================================================

import { ref } from 'vue'


// ==========================================================
// MOSTRAR / OCULTAR FORMULARIO
// ==========================================================

const mostrarFormulario = ref(false)


// ==========================================================
// USUARIOS
// ==========================================================

const usuarios = ref([

  {
    id: 1,
    nombre: 'Administrador',
    correo: 'admin@biblioteca.com',
    password: 'Admin123',
    tipo: 'Administrador'
  },

  {
    id: 2,
    nombre: 'Ruby Sosa',
    correo: 'ruby@alumnos.uady.mx',
    password: 'Ruby2026',
    tipo: 'Alumno'
  },

  {
    id: 3,
    nombre: 'Gabriela Cuellar',
    correo: 'gabriela@alumnos.uady.mx',
    password: 'Gaby2026',
    tipo: 'Alumno'
  },

  {
    id: 4,
    nombre: 'Bibliotecario',
    correo: 'biblioteca@fca.uady.mx',
    password: 'Biblio789',
    tipo: 'Bibliotecario'
  },

  {
    id: 5,
    nombre: 'Maestro FCA',
    correo: 'maestro@fca.uady.mx',
    password: 'Maestro2026',
    tipo: 'Maestro'
  },

  {
    id: 6,
    nombre: 'Usuario Externo',
    correo: 'externo@biblioteca.com',
    password: 'Externo2026',
    tipo: 'Externo'
  }

])


// ==========================================================
// NUEVO USUARIO
// ==========================================================

const nuevoUsuario = ref({

  nombre: '',

  correo: '',

  password: '',

  tipo: ''

})


// ==========================================================
// AGREGAR USUARIO
// ==========================================================

const agregarUsuario = () => {

  // Comprobamos que todos los campos estén llenos.
  if (
    !nuevoUsuario.value.nombre ||
    !nuevoUsuario.value.correo ||
    !nuevoUsuario.value.password ||
    !nuevoUsuario.value.tipo
  ) {

    alert(
      'Por favor completa todos los campos.'
    )

    return
  }


  // Comprobamos que el correo no esté repetido.
  const correoExiste =
    usuarios.value.some(

      usuario =>

        usuario.correo.toLowerCase() ===
        nuevoUsuario.value.correo
          .trim()
          .toLowerCase()

    )


  if (correoExiste) {

    alert(
      'Ya existe un usuario registrado con ese correo.'
    )

    return
  }


  // Agregamos el nuevo usuario.
  usuarios.value.push({

    // ID temporal.
    id: Date.now(),

    nombre:
      nuevoUsuario.value.nombre,

    correo:
      nuevoUsuario.value.correo,

    password:
      nuevoUsuario.value.password,

    tipo:
      nuevoUsuario.value.tipo

  })


  // Limpiamos formulario.
  limpiarFormulario()

}


// ==========================================================
// CANCELAR
// ==========================================================

const cancelarFormulario = () => {

  limpiarFormulario()

}


// ==========================================================
// LIMPIAR FORMULARIO
// ==========================================================

const limpiarFormulario = () => {

  nuevoUsuario.value = {

    nombre: '',

    correo: '',

    password: '',

    tipo: ''

  }

  mostrarFormulario.value = false

}


// ==========================================================
// ELIMINAR USUARIO
// ==========================================================

const eliminarUsuario = (id: number) => {

  const confirmar =
    confirm(
      '¿Deseas eliminar este usuario?'
    )


  if (!confirmar) {

    return
  }


  usuarios.value =
    usuarios.value.filter(

      usuario =>
        usuario.id !== id

    )

}

</script>