<template>

  <!-- Contenedor de la página -->
  <section>

    <!-- Título -->
    <div class="page-title">

      <h1>Panel de administración</h1>

      <p>
        Bienvenido al Sistema de Control de Biblioteca.
      </p>

    </div>

    <!-- Tarjetas informativas -->
    <div class="cards">

      <!-- Usuarios -->
      <div class="card">

        <h3>Usuarios</h3>

        <span>{{ totalUsuarios }}</span>

        <p>Usuarios registrados</p>

      </div>

      <!-- Libros -->
      <div class="card">

        <h3>Acervo</h3>

        <span>4</span>

        <p>Libros registrados</p>

      </div>

      <!-- Disponibles -->
      <div class="card">

        <h3>Disponibles</h3>

        <span>3</span>

        <p>Libros disponibles</p>

      </div>

      <!-- Alumnos -->
      <div class="card">

        <h3>Alumnos</h3>

        <span>3</span>

        <p>Alumnos registrados</p>

      </div>

    </div>

  </section>

</template>

<script setup lang="ts">

// Importamos ref para utilizar variables reactivas.
import { ref } from 'vue'

// Número de usuarios que mostraremos.
// Más adelante puede calcularse automáticamente.
const totalUsuarios = ref(3)

</script>