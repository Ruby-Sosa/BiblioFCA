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
        v-model="matricula"
        placeholder="Ingresa la matrícula"
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
        <strong>Matrícula:</strong>
        {{ resultado.matricula }}
      </p>

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

// Importamos ref.
import { ref } from 'vue'

// Matrícula escrita por el usuario.
const matricula = ref('')

// Resultado de la consulta.
const resultado = ref<any>(null)

// Función para simular la validación.
const validarAlumno = () => {

  // Validamos que exista una matrícula.
  if (!matricula.value) {

    alert('Ingresa una matrícula.')

    return
  }

  /*
    En un sistema real, aquí se realizaría
    una petición a la API de Control Escolar.

    Por el momento simulamos la respuesta.
  */
  resultado.value = {

    matricula: matricula.value,

    nombre: 'Alumno FCA',

    estado: 'Activo'

  }

}

</script>