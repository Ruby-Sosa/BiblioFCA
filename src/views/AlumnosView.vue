<template>

  <section>

    <!-- Título -->
    <div class="page-title">

      <div>
        <h1>Validación de alumnos</h1>
        <p>
          Validación del estado del alumno mediante
          Control Escolar.
        </p>

      </div>

    </div>

    <!-- Formulario -->
    <div class="form-card">

      <h3>Consultar alumno</h3>

      <!-- Matrícula -->
      <input
        v-model="nombre"
        placeholder="Ingresa el nombre del alumno"
      />

      <!-- Botón -->
      <button
        class="btn-primary"
        @click="validarAlumno"
      >
        Validar alumno
      </button>

    </div>

    <!-- Resultado -->
    <div
      v-if="resultado"
      class="resultado"
    >

      <h3>Resultado de la consulta</h3>

      <p>
        <strong>Nombre:</strong>
        {{ resultado.nombre }}
      </p>

      <p>
        <strong>Estado:</strong>

        <span class="badge disponible">
          {{ resultado.estado }}
        </span>

      </p>

      <p>
        <strong>Facultad:</strong>
        FCA
      </p>

    </div>

  </section>

</template>

<script setup lang="ts">

import { ref } from 'vue'

// Nombre escrito por el usuario.
const nombre = ref('')

// Resultado de la consulta.
const resultado = ref<any>(null)

// Lista de alumnos registrados.
const alumnos = [

  {
    nombre: 'Ruby Sosa',
    correo: 'ruby@alumnos.uady.mx',
    rol: 'Alumno'
  },

  {
    nombre: 'Gabriela Cuellar',
    correo: 'gabriela@alumnos.uady.mx',
    rol: 'Alumno'
  }

]

// Función para validar alumno.
const validarAlumno = () => {

  if (!nombre.value) {

    alert('Ingresa el nombre del alumno.')

    return

  }

  const alumnoEncontrado = alumnos.find(

    alumno =>

      alumno.nombre.toLowerCase() ===
      nombre.value.trim().toLowerCase()

  )

  if (alumnoEncontrado) {

    resultado.value = {

      nombre: alumnoEncontrado.nombre,

      correo: alumnoEncontrado.correo,

      estado: 'Activo'

    }

  }

  else {

    resultado.value = null

    alert('Alumno no encontrado.')

  }

}

</script>