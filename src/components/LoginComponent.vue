<template>
  <!-- Contenedor general de la pantalla de Login -->
  <div class="login-page">
    <!-- Tarjeta donde se encuentra el formulario -->
    <div class="login-card">
      <!-- Nombre del sistema -->
      <h1>BiblioFCA</h1>

      <!-- Descripción -->
      <p class="subtitle">
        Sistema de Control de Biblioteca
      </p>

      <!-- Formulario de inicio de sesión -->
      <form @submit.prevent="iniciarSesion">
        <!-- Campo correo -->
        <div class="form-group">
          <label>Correo electrónico</label>
          <input
            v-model="correo"
            type="email"
            placeholder="Ingresa tu correo"
          />
        </div>

        <!-- Campo contraseña -->
        <div class="form-group">
          <label>Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <!-- ==========================================================
             Campos del captcha
             ========================================================== -->
        <div class="form-group" id="captcha-container">
          <label>Código de verificación (Captcha)</label>
          <div class="captcha-box" style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span style="background: #e2e8f0; padding: 8px 15px; font-weight: bold; letter-spacing: 3px; border-radius: 4px; user-select: none; font-family: monospace; font-size: 1.2rem;">
              {{ textoCaptcha }}
            </span>
            <button type="button" @click="generarCaptcha" style="padding: 6px 10px; cursor: pointer;">🔄</button>
          </div>
          <input
            v-model="inputCaptcha"
            type="text"
            placeholder="Ingresa los caracteres"
          />
        </div>

        <!-- Este mensaje solamente aparece cuando existe algún error. -->
        <p
          v-if="mensajeError"
          class="error"
        >
          {{ mensajeError }}
        </p>

        <!-- Botón para iniciar sesión -->
        <button
          type="submit"
          class="btn-primary"
        >
          Iniciar sesión
        </button>
      </form>

      <!-- Credenciales de prueba -->
      <div class="demo">
        <strong>Usuario de prueba</strong>
        <p>Correo: admin@biblioteca.com</p>
        <p>Contraseña: 1234</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const correo = ref('')
const password = ref('')
const mensajeError = ref('')

// VARIABLES PARA EL CAPTCHA 
const textoCaptcha = ref('')
const inputCaptcha = ref('')

// Función para generar un texto aleatorio de letras y números
const generarCaptcha = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' //Define una cadena con todas las letras y números permitidos.
  let resultado = ''
  //Ciclo para que en cada inicio de sesión vaya cambiando para seleccionar 6 caracteres aleatorios
  for (let i = 0; i < 6; i++) { 
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  textoCaptcha.value = resultado
  inputCaptcha.value = '' // Limpiar el input al recargar
}

// Generar el captcha al cargar el componente
onMounted(() => {
  generarCaptcha()
})

// Función encargada de validar el inicio de sesión modificada con el captcha
const iniciarSesion = () => {
  mensajeError.value = ''

  // Validar campos vacíos incluyendo el captcha
  if (!correo.value || !password.value || !inputCaptcha.value) {
    mensajeError.value = 'Por favor completa todos los campos, incluyendo el captcha.'
    return
  }

  // Validar que el captcha coincida (sensible a mayúsculas/minúsculas)
  if (inputCaptcha.value !== textoCaptcha.value) {
    mensajeError.value = 'El código de verificación (captcha) es incorrecto.'
    generarCaptcha() // Renovar captcha por seguridad
    return
  }

  // Comparamos las credenciales
  if (
    correo.value === 'admin@biblioteca.com' &&
    password.value === '1234'
  ) {
    localStorage.setItem('sesion', 'activa')
    localStorage.setItem('rol', 'Administrador')
    router.push('/panel')
  } else {
    mensajeError.value = 'Correo o contraseña incorrectos.'
    generarCaptcha() // Renovar captcha si fallan las credenciales
  }
}
</script>