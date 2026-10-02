<template>

  <section>

    <!-- Encabezado -->
    <div class="page-title">

      <div>

        <h1>Roles del sistema</h1>

        <p>
          Consulta los permisos correspondientes
          a cada tipo de usuario.
        </p>

      </div>

    </div>

    <!-- Tabla -->
    <div class="table-container">

      <table>

        <thead>

          <tr>

            <th>Rol</th>

            <th>Usuarios</th>

            <th>Acervo</th>

            <th>Alumnos</th>

            <th>Administración</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>Administrador</td>

            <td>Administrar</td>

            <td>Administrar</td>

            <td>Consultar</td>

            <td>Completa</td>

          </tr>

          <tr>

            <td>Bibliotecario</td>

            <td>Consultar</td>

            <td>Administrar</td>

            <td>Consultar</td>

            <td>Limitada</td>

          </tr>

          <tr>

            <td>Alumno</td>

            <td>Sin acceso</td>

            <td>Consultar</td>

            <td>Sin acceso</td>

            <td>Sin acceso</td>

          </tr>

          <tr>

            <td>Externo</td>

            <td>Sin acceso</td>

            <td>Consultar</td>

            <td>Sin acceso</td>

            <td>Sin acceso</td>

          </tr>

        </tbody>

      </table>

    </div>

  </section>

</template>