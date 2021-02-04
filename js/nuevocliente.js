(function () {
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    formulario.addEventListener("submit", validarCliente);
  });

  function validarCliente(e) {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    const objCliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now(),
    };

    crearNuevoCliente(objCliente);
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);

    transaction.onerror = () => {
      console.log("No se pudo agregar el cliente");
      imprimirAlerta("El mail o el nombre ya estan registrados", "error");
    };

    transaction.oncomplete = () => {
      console.log("Cliente agregado");
      imprimirAlerta("El cliente se agrego correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }
})();
