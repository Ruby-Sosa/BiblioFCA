<template>

  <section>

    <!-- Encabezado -->
    <div class="page-title">

      <div>

        <h1>Acervo bibliotecario</h1>

        <p>
          Consulta y administra los libros de la biblioteca.
        </p>

      </div>

      <!-- Botón agregar -->
      <button
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        Agregar libro
      </button>

    </div>

    <!-- Formulario -->
    <div
      v-if="mostrarFormulario"
      class="form-card"
    >

      <h3>Registrar libro</h3>

      <div class="form-grid">

        <!-- Título -->
        <input
          v-model="nuevoLibro.titulo"
          placeholder="Título"
        />

        <!-- Autor -->
        <input
          v-model="nuevoLibro.autor"
          placeholder="Autor"
        />

        <!-- ISBN -->
        <input
          v-model="nuevoLibro.isbn"
          placeholder="ISBN"
        />

        <!-- Categoría -->
        <input
          v-model="nuevoLibro.categoria"
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
          @click="mostrarFormulario = false"
        >
          Cancelar
        </button>

      </div>

    </div>

    <!-- Buscador -->
    <div class="search-box">

      <input
        v-model="busqueda"
        placeholder="Buscar por título, autor, ISBN o categoría..."
      />

    </div>

    <!-- Tabla -->
    <div class="table-container">

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Título</th>

            <th>Autor</th>

            <th>ISBN</th>

            <th>Categoría</th>

            <th>Disponibilidad</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          <!-- Mostramos únicamente los libros filtrados -->
          <tr
            v-for="libro in librosFiltrados"
            :key="libro.id"
          >

            <td>{{ libro.id }}</td>

            <td>{{ libro.titulo }}</td>

            <td>{{ libro.autor }}</td>

            <td>{{ libro.isbn }}</td>

            <td>{{ libro.categoria }}</td>

            <td>

              <span
                class="badge"
                :class="{ disponible: libro.disponible }"
              >

                {{
                  libro.disponible
                    ? 'Disponible'
                    : 'No disponible'
                }}

              </span>

            </td>

            <td>

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

// Importamos ref y computed.
import {
  ref,
  computed
} from 'vue'

// Control del formulario.
const mostrarFormulario = ref(false)

// Texto del buscador.
const busqueda = ref('')

// Lista de libros.
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
    autor: 'Silberschatz',
    isbn: '9788448156718',
    categoria: 'Bases de datos',
    disponible: true
  },

  {
    id: 3,
    titulo: 'Redes de Computadoras',
    autor: 'Andrew Tanenbaum',
    isbn: '9786073208178',
    categoria: 'Redes',
    disponible: false
  },

  {
    id: 4,
    titulo: 'Ingeniería de Software',
    autor: 'Ian Sommerville',
    isbn: '9786073227354',
    categoria: 'Software',
    disponible: true
  }

])

// Datos del nuevo libro.
const nuevoLibro = ref({

  titulo: '',
  autor: '',
  isbn: '',
  categoria: ''

})

// Computed crea una lista automáticamente
// dependiendo de lo escrito en el buscador.
const librosFiltrados = computed(() => {

  // Convertimos la búsqueda a minúsculas.
  const texto =
    busqueda.value.toLowerCase()

  // Filtramos los libros.
  return libros.value.filter(libro =>

    libro.titulo.toLowerCase().includes(texto) ||

    libro.autor.toLowerCase().includes(texto) ||

    libro.isbn.toLowerCase().includes(texto) ||

    libro.categoria.toLowerCase().includes(texto)

  )

})

// Agregar libro.
const agregarLibro = () => {

  // Validamos los campos.
  if (
    !nuevoLibro.value.titulo ||
    !nuevoLibro.value.autor ||
    !nuevoLibro.value.isbn ||
    !nuevoLibro.value.categoria
  ) {

    alert('Completa todos los campos.')

    return
  }

  // Insertamos el libro.
  libros.value.push({

    id: Date.now(),

    titulo: nuevoLibro.value.titulo,

    autor: nuevoLibro.value.autor,

    isbn: nuevoLibro.value.isbn,

    categoria: nuevoLibro.value.categoria,

    // Todo libro nuevo estará disponible.
    disponible: true

  })

  // Limpiamos los campos.
  nuevoLibro.value = {

    titulo: '',
    autor: '',
    isbn: '',
    categoria: ''

  }

  // Cerramos el formulario.
  mostrarFormulario.value = false

}

// Eliminar libro.
const eliminarLibro = (id: number) => {

  const confirmar =
    confirm('¿Deseas eliminar este libro?')

  if (!confirmar) {
    return
  }

  libros.value =
    libros.value.filter(
      libro => libro.id !== id
    )

}

</script>