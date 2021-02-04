const alerta = document.querySelector(".alerta");

let DB = "";

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

function imprimirAlerta(mensaje, tipo) {
  if (!alerta) {
    const divMensaje = document.createElement("div");

    divMensaje.classList.add(
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "border"
    );

    if (tipo === "error") {
      divMensaje.classList.add("bg-red-100", "border-red-400", "text-red-700");
    } else {
      divMensaje.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
    }

    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}
