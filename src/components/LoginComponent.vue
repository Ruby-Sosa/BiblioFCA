<template>

  <!-- ==========================================================
       PANTALLA GENERAL DEL LOGIN
       ========================================================== -->
  <div class="login-page">

    <!-- Tarjeta que contiene el formulario -->
    <div class="login-card">

      <!-- Nombre del sistema -->
      <h1>BiblioFCA</h1>

      <!-- Descripción -->
      <p class="subtitle">
        Sistema de Control de Biblioteca
      </p>


      <!-- ======================================================
           FORMULARIO
           ====================================================== -->

      <!--
        @submit.prevent evita que la página se recargue
        y ejecuta nuestra función iniciarSesion().
      -->
      <form @submit.prevent="iniciarSesion">


        <!-- CORREO -->
        <div class="form-group">

          <label>Correo electrónico</label>

          <!--
            v-model conecta el input con la variable correo.
          -->
          <input
            v-model="correo"
            type="email"
            placeholder="Ingresa tu correo"
          />

        </div>


        <!-- CONTRASEÑA -->
        <div class="form-group">

          <label>Contraseña</label>

          <!--
            type="password" oculta visualmente
            los caracteres escritos.
          -->
          <input
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
          />

        </div>


        <!-- ====================================================
             CAPTCHA
             ==================================================== -->

        <div
          class="form-group"
          id="captcha-container"
        >

          <label>
            Código de verificación (Captcha)
          </label>


          <!-- Contenedor del captcha -->
          <div
            class="captcha-box"
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 8px;
            "
          >

            <!-- Código generado automáticamente -->
            <span
              style="
                background: #e2e8f0;
                padding: 8px 15px;
                font-weight: bold;
                letter-spacing: 3px;
                border-radius: 4px;
                user-select: none;
                font-family: monospace;
                font-size: 1.2rem;
              "
            >
              {{ textoCaptcha }}
            </span>


            <!--
              Botón para generar otro captcha.

              type="button" evita que se envíe
              accidentalmente el formulario.
            -->
            <button
              type="button"
              @click="generarCaptcha"
              style="
                padding: 6px 10px;
                cursor: pointer;
              "
            >
              🔄
            </button>

          </div>


          <!-- Campo donde el usuario escribe el captcha -->
          <input
            v-model="inputCaptcha"
            type="text"
            placeholder="Ingresa los caracteres"
          />

        </div>


        <!-- ====================================================
             MENSAJE DE ERROR
             ==================================================== -->

        <!--
          Solo aparece cuando mensajeError
          contiene algún texto.
        -->
        <p
          v-if="mensajeError"
          class="error"
        >
          {{ mensajeError }}
        </p>


        <!-- BOTÓN -->
        <button
          type="submit"
          class="btn-primary"
        >
          Iniciar sesión
        </button>

      </form>

    </div>

  </div>

</template>


<script setup lang="ts">

// ==========================================================
// IMPORTACIONES
// ==========================================================

/*
  ref permite crear variables reactivas.

  onMounted permite ejecutar código cuando
  el componente termina de cargarse.
*/
import {
  ref,
  onMounted
} from 'vue'

/*
  useRouter nos permite cambiar de página
  desde JavaScript.
*/
import { useRouter } from 'vue-router'


// ==========================================================
// ROUTER
// ==========================================================

const router = useRouter()


// ==========================================================
// VARIABLES DEL FORMULARIO
// ==========================================================

// Guarda el correo escrito.
const correo = ref('')

// Guarda la contraseña escrita.
const password = ref('')

// Guarda los mensajes de error.
const mensajeError = ref('')


// ==========================================================
// USUARIOS DE PRUEBA
// ==========================================================

/*
  Cada usuario tiene:

  nombre
  correo
  password
  rol

  El rol será utilizado para determinar
  qué módulos puede visualizar.

  IMPORTANTE:
  Esto es adecuado como demostración académica.

  En una aplicación real las contraseñas no deberían
  estar escritas directamente en el frontend.
*/
const usuarios = [

  // ADMINISTRADOR
  {
    nombre: 'Administrador',
    correo: 'admin@biblioteca.com',
    password: 'Admin123',
    rol: 'Administrador'
  },


  // RUBY - ALUMNA
  {
    nombre: 'Ruby Sosa',
    correo: 'ruby@alumnos.uady.mx',
    password: 'Ruby2026',
    rol: 'Alumno'
  },


  // GABRIELA - ALUMNA
  {
    nombre: 'Gabriela Cuellar',
    correo: 'gabriela@alumnos.uady.mx',
    password: 'Gaby2026',
    rol: 'Alumno'
  },


  // BIBLIOTECARIO
  {
    nombre: 'Bibliotecario',
    correo: 'biblioteca@fca.uady.mx',
    password: 'Biblio789',
    rol: 'Bibliotecario'
  },


  // MAESTRO
  {
    nombre: 'Maestro FCA',
    correo: 'maestro@fca.uady.mx',
    password: 'Maestro2026',
    rol: 'Maestro'
  },


  // USUARIO EXTERNO
  {
    nombre: 'Usuario Externo',
    correo: 'externo@biblioteca.com',
    password: 'Externo2026',
    rol: 'Externo'
  }

]


// ==========================================================
// CAPTCHA
// ==========================================================

// Guarda el captcha generado.
const textoCaptcha = ref('')

// Guarda el captcha escrito por el usuario.
const inputCaptcha = ref('')


// ==========================================================
// GENERAR CAPTCHA
// ==========================================================

const generarCaptcha = () => {

  /*
    Caracteres que pueden aparecer
    dentro del captcha.
  */
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  // Aquí construiremos el captcha.
  let resultado = ''


  /*
    Ejecutamos seis veces el ciclo
    para generar 6 caracteres.
  */
  for (let i = 0; i < 6; i++) {

    resultado += caracteres.charAt(

      Math.floor(
        Math.random() * caracteres.length
      )

    )

  }


  // Guardamos el captcha generado.
  textoCaptcha.value = resultado


  // Limpiamos el campo.
  inputCaptcha.value = ''

}


// ==========================================================
// GENERAR CAPTCHA AL ABRIR LA PÁGINA
// ==========================================================

onMounted(() => {

  generarCaptcha()

})


// ==========================================================
// INICIAR SESIÓN
// ==========================================================

const iniciarSesion = () => {

  // Limpiamos errores anteriores.
  mensajeError.value = ''


  // ========================================================
  // VALIDAR CAMPOS VACÍOS
  // ========================================================

  if (
    !correo.value ||
    !password.value ||
    !inputCaptcha.value
  ) {

    mensajeError.value =
      'Por favor completa todos los campos, incluyendo el captcha.'

    return
  }


  // ========================================================
  // VALIDAR CAPTCHA
  // ========================================================

  /*
    Comparamos lo escrito con el captcha generado.
  */
  if (
    inputCaptcha.value !== textoCaptcha.value
  ) {

    mensajeError.value =
      'El código de verificación (captcha) es incorrecto.'

    // Generamos otro captcha.
    generarCaptcha()

    return
  }


  // ========================================================
  // BUSCAR USUARIO
  // ========================================================

  /*
    find() busca un usuario cuyo correo
    y contraseña coincidan.
  */
  const usuarioEncontrado = usuarios.find(

    usuario =>

      usuario.correo.toLowerCase() ===
        correo.value.trim().toLowerCase()

      &&

      usuario.password === password.value

  )


  // ========================================================
  // CREDENCIALES CORRECTAS
  // ========================================================

  if (usuarioEncontrado) {

    /*
      Guardamos que existe una sesión.
    */
    localStorage.setItem(
      'sesion',
      'activa'
    )


    /*
      Guardamos el nombre.
    */
    localStorage.setItem(
      'nombre',
      usuarioEncontrado.nombre
    )


    /*
      Guardamos el correo.
    */
    localStorage.setItem(
      'correo',
      usuarioEncontrado.correo
    )


    /*
      Guardamos el rol.

      ESTE DATO ES EL MÁS IMPORTANTE PARA
      CONTROLAR LOS PERMISOS.
    */
    localStorage.setItem(
      'rol',
      usuarioEncontrado.rol
    )


    /*
      Mandamos al usuario al panel.
    */
    router.push('/panel')

  }

  else {

    // Credenciales incorrectas.
    mensajeError.value =
      'Correo o contraseña incorrectos.'

    // Generamos otro captcha.
    generarCaptcha()

  }

}

</script>