<template>

  <section>

    <!-- Encabezado de la página -->
    <div class="page-title">

      <div>

        <h1>Gestión de usuarios</h1>

        <p>
          Administra los usuarios internos y externos.
        </p>

      </div>

      <!-- Botón para mostrar el formulario -->
      <button
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        Agregar usuario
      </button>

    </div>

    <!-- Formulario para agregar usuarios -->
    <div
      v-if="mostrarFormulario"
      class="form-card"
    >

      <h3>Nuevo usuario</h3>

      <div class="form-grid">

        <!-- Nombre -->
        <input
          v-model="nuevoUsuario.nombre"
          placeholder="Nombre completo"
        />

        <!-- Correo -->
        <input
          v-model="nuevoUsuario.correo"
          placeholder="Correo electrónico"
        />

        <!-- Tipo de usuario -->
        <select v-model="nuevoUsuario.tipo">

          <option value="">
            Selecciona un tipo
          </option>

          <option>
            Administrador
          </option>

          <option>
            Bibliotecario
          </option>

          <option>
            Alumno
          </option>

          <option>
            Externo
          </option>

        </select>

      </div>

      <!-- Botones -->
      <div class="form-actions">

        <button
          class="btn-primary"
          @click="agregarUsuario"
        >
          Guardar
        </button>

        <button
          class="btn-secondary"
          @click="mostrarFormulario = false"
        >
          Cancelar
        </button>

      </div>

    </div>

    <!-- Tabla de usuarios -->
    <div class="table-container">

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Nombre</th>

            <th>Correo</th>

            <th>Tipo</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          <!--
            Recorremos el arreglo usuarios
            para crear una fila por usuario.
          -->
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

              <!-- Botón para eliminar -->
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

// Importamos ref.
import { ref } from 'vue'

// Controla si mostramos o no el formulario.
const mostrarFormulario = ref(false)

// Lista inicial de usuarios.
const usuarios = ref([

  {
    id: 1,
    nombre: 'Administrador',
    correo: 'admin@biblioteca.com',
    tipo: 'Administrador'
  },

  {
    id: 2,
    nombre: 'Ruby Sosa',
    correo: 'ruby@alumnos.uady.mx',
    tipo: 'Alumno'
  },

  {
    id: 3,
    nombre: 'Gabriela Cuellar',
    correo: 'gabriela@alumnos.uady.mx',
    tipo: 'Alumno'
  }

])

// Datos del nuevo usuario.
const nuevoUsuario = ref({

  nombre: '',
  correo: '',
  tipo: ''

})

// Función para agregar un usuario.
const agregarUsuario = () => {

  // Validamos que todos los campos estén llenos.
  if (
    !nuevoUsuario.value.nombre ||
    !nuevoUsuario.value.correo ||
    !nuevoUsuario.value.tipo
  ) {

    alert('Completa todos los campos.')

    return
  }

  // Agregamos el nuevo usuario al arreglo.
  usuarios.value.push({

    // Generamos un ID sencillo.
    id: Date.now(),

    nombre: nuevoUsuario.value.nombre,

    correo: nuevoUsuario.value.correo,

    tipo: nuevoUsuario.value.tipo

  })

  // Limpiamos el formulario.
  nuevoUsuario.value = {
    nombre: '',
    correo: '',
    tipo: ''
  }

  // Cerramos el formulario.
  mostrarFormulario.value = false

}

// Función para eliminar un usuario.
const eliminarUsuario = (id: number) => {

  // Confirmamos antes de eliminar.
  const confirmar =
    confirm('¿Deseas eliminar este usuario?')

  if (!confirmar) {
    return
  }

  // Buscamos el usuario y lo eliminamos.
  usuarios.value =
    usuarios.value.filter(
      usuario => usuario.id !== id
    )

}

</script>