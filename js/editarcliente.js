(function () {
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");

  const formulario = document.querySelector("#formulario");

  let DB = "";
  let clienteId = "";

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    const parametrosURL = new URLSearchParams(window.location.search);
    clienteId = parametrosURL.get("id");

    if (clienteId) {
      setTimeout(() => {
        obtenerCliente(clienteId);
      }, 100);
    }

    formulario.addEventListener("submit", actualizarCliente);
  });

  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === "" ||
      emailInput.value === "" ||
      telefonoInput.value === "" ||
      empresaInput.value === ""
    ) {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    const objClienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: emailInput.value,
      id: Number(clienteId),
    };

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.put(objClienteActualizado);

    transaction.onerror = (e) => {
      console.log("Hubo un error al actualizar el registro");
      console.error(e);
    };

    transaction.oncomplete = () => {
      console.log("Registro actualizado");
      imprimirAlerta("Registro correctamente actualizado");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();

    cliente.onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }

        cursor.continue();
      }
    };
  }

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onsuccess = () => {
      console.log("Se pudo establecer la conexion con la DB");
      DB = abrirConexion.result;
    };

    abrirConexion.onerror = () => {
      console.log("Hubo un error al abrir la conexion con la DB");
    };
  }
})();
