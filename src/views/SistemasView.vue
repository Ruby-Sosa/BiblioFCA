<template>

  <!-- ==========================================================
       ACERVO BIBLIOTECARIO
       ========================================================== -->

  <section>


    <!-- ========================================================
         ENCABEZADO
         ======================================================== -->

    <div class="page-title">

      <div>

        <h1>
          Acervo bibliotecario
        </h1>

        <p>
          Consulta los materiales disponibles en BiblioFCA.
        </p>

      </div>


      <!--
        Únicamente Administrador y Bibliotecario
        pueden agregar libros.
      -->
      <button
        v-if="puedeAdministrar"
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        Agregar libro
      </button>

    </div>


    <!-- ========================================================
         BUSCADOR
         ======================================================== -->

    <!--
      Este buscador está disponible para TODOS.
    -->
    <div class="form-card">

      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por título, autor, ISBN o categoría"
      />

    </div>


    <!-- ========================================================
         FORMULARIO PARA AGREGAR LIBROS
         ======================================================== -->

    <!--
      Solamente puede aparecer si el usuario
      tiene permisos administrativos.
    -->
    <div
      v-if="
        mostrarFormulario &&
        puedeAdministrar
      "
      class="form-card"
    >

      <h3>
        Registrar libro
      </h3>


      <div class="form-grid">

        <!-- Título -->
        <input
          v-model="nuevoLibro.titulo"
          type="text"
          placeholder="Título"
        />


        <!-- Autor -->
        <input
          v-model="nuevoLibro.autor"
          type="text"
          placeholder="Autor"
        />


        <!-- ISBN -->
        <input
          v-model="nuevoLibro.isbn"
          type="text"
          placeholder="ISBN"
        />


        <!-- Categoría -->
        <input
          v-model="nuevoLibro.categoria"
          type="text"
          placeholder="Categoría"
        />

      </div>


      <div class="form-actions">

        <button
          class="btn-primary"
          @click="agregarLibro"
        >
          Guardar
        </button>


        <button
          class="btn-secondary"
          @click="cancelar"
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

            <th>Título</th>

            <th>Autor</th>

            <th>ISBN</th>

            <th>Categoría</th>

            <th>Disponibilidad</th>

            <!--
              La columna Acciones solamente aparece
              para Administrador y Bibliotecario.
            -->
            <th v-if="puedeAdministrar">
              Acciones
            </th>

          </tr>

        </thead>


        <tbody>

          <!--
            librosFiltrados cambia automáticamente
            según lo escrito en el buscador.
          -->
          <tr
            v-for="libro in librosFiltrados"
            :key="libro.id"
          >

            <td>
              {{ libro.titulo }}
            </td>

            <td>
              {{ libro.autor }}
            </td>

            <td>
              {{ libro.isbn }}
            </td>

            <td>
              {{ libro.categoria }}
            </td>

            <td>

              <span class="badge">

                {{
                  libro.disponible
                    ? 'Disponible'
                    : 'No disponible'
                }}

              </span>

            </td>


            <!--
              Eliminar también está restringido.
            -->
            <td v-if="puedeAdministrar">

              <button
                class="btn-danger"
                @click="eliminarLibro(libro.id)"
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

import {
  ref,
  computed
} from 'vue'


// ==========================================================
// ROL
// ==========================================================

/*
  Recuperamos el rol de quien inició sesión.
*/
const rol =
  localStorage.getItem('rol') || 'Externo'


// ==========================================================
// PERMISOS
// ==========================================================

/*
  Esta variable será true únicamente cuando
  el usuario sea Administrador o Bibliotecario.
*/
const puedeAdministrar = computed(() => {

  return (
    rol === 'Administrador' ||
    rol === 'Bibliotecario'
  )

})


// ==========================================================
// FORMULARIO
// ==========================================================

const mostrarFormulario = ref(false)


// ==========================================================
// BUSCADOR
// ==========================================================

const busqueda = ref('')


// ==========================================================
// LIBROS
// ==========================================================

const libros = ref([

  {
    id: 1,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    isbn: '9780132350884',
    categoria: 'Programación',
    disponible: true
  },

  {
    id: 2,
    titulo: 'Fundamentos de Bases de Datos',
    autor: 'Abraham Silberschatz',
    isbn: '9788448156718',
    categoria: 'Bases de Datos',
    disponible: true
  },

  {
    id: 3,
    titulo: 'Redes de Computadoras',
    autor: 'Andrew S. Tanenbaum',
    isbn: '9786073208178',
    categoria: 'Redes',
    disponible: false
  },

  {
    id: 4,
    titulo: 'Ingeniería de Software',
    autor: 'Ian Sommerville',
    isbn: '9786073227022',
    categoria: 'Software',
    disponible: true
  }

])


// ==========================================================
// NUEVO LIBRO
// ==========================================================

const nuevoLibro = ref({

  titulo: '',

  autor: '',

  isbn: '',

  categoria: ''

})


// ==========================================================
// FILTRAR LIBROS
// ==========================================================

const librosFiltrados = computed(() => {

  /*
    Convertimos la búsqueda a minúsculas
    para facilitar las comparaciones.
  */
  const texto =
    busqueda.value.toLowerCase()


  /*
    filter() devuelve solamente los libros
    que coinciden con la búsqueda.
  */
  return libros.value.filter(libro =>

    libro.titulo
      .toLowerCase()
      .includes(texto)

    ||

    libro.autor
      .toLowerCase()
      .includes(texto)

    ||

    libro.isbn
      .toLowerCase()
      .includes(texto)

    ||

    libro.categoria
      .toLowerCase()
      .includes(texto)

  )

})


// ==========================================================
// AGREGAR LIBRO
// ==========================================================

const agregarLibro = () => {

  /*
    Segunda comprobación de permisos.

    Aunque el botón esté oculto, también
    verificamos el permiso dentro de la función.
  */
  if (!puedeAdministrar.value) {

    return

  }


  // Validamos campos.
  if (
    !nuevoLibro.value.titulo ||
    !nuevoLibro.value.autor ||
    !nuevoLibro.value.isbn ||
    !nuevoLibro.value.categoria
  ) {

    alert(
      'Por favor completa todos los campos.'
    )

    return
  }


  // Agregamos el libro.
  libros.value.push({

    id: Date.now(),

    titulo:
      nuevoLibro.value.titulo,

    autor:
      nuevoLibro.value.autor,

    isbn:
      nuevoLibro.value.isbn,

    categoria:
      nuevoLibro.value.categoria,

    disponible: true

  })


  // Limpiamos el formulario.
  nuevoLibro.value = {

    titulo: '',

    autor: '',

    isbn: '',

    categoria: ''

  }


  mostrarFormulario.value = false

}


// ==========================================================
// CANCELAR
// ==========================================================

const cancelar = () => {

  nuevoLibro.value = {

    titulo: '',

    autor: '',

    isbn: '',

    categoria: ''

  }

  mostrarFormulario.value = false

}


// ==========================================================
// ELIMINAR LIBRO
// ==========================================================

const eliminarLibro = (id: number) => {

  /*
    Verificamos nuevamente los permisos.
  */
  if (!puedeAdministrar.value) {

    return

  }


  const confirmar =
    confirm(
      '¿Deseas eliminar este libro?'
    )


  if (!confirmar) {

    return

  }


  libros.value =
    libros.value.filter(

      libro =>
        libro.id !== id

    )

}

</script>