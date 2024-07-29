import toast, { Toaster } from "react-hot-toast";
import error from "../../error";
import "./FormInsc.css";
import { jwtDecode } from "jwt-decode";

function FormInsc() {
  const API = import.meta.env.VITE_API_URL;
  const inscripcion = (e) => {
    e.preventDefault();
    const decode = jwtDecode(sessionStorage.token);
    const formData = {
      nombre: e.target.nombre.value,
      Apellido: e.target.Apellido.value,
      Apellidos: e.target.Apellidos.value,
      tel: e.target.tel.value,
      dni: e.target.dni.value,
      id: decode.id,
    };
    try {
      error.validateStringNotEmptyNoSpaces(formData.nombre);
      error.validateStringNotEmptyNoSpaces(formData.Apellido);
      error.validateStringNotEmptyNoSpaces(formData.Apellidos);
      error.validateStringNotEmptyNoSpaces(formData.tel);
      error.validateStringNotEmptyNoSpaces(formData.dni);
      error.validateDNI(formData.dni);
      error.validateTel(formData.tel);
      error.validateId(formData.id)

      fetch(`${API}/inscripción/ins.php`, {
        // Usa la URL directa al servidor PHP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      debugger;
      toast.error(`error: ${error.message}`);
    }
  };
  return (
    <div className="">
      <h1>Inscripciones</h1>
      <form className="FormInsc" onSubmit={inscripcion}>
        <input
          className="inputFormIns"
          type="text"
          name="nombre"
          placeholder="Nombre"
        ></input>
        <input
          className="inputFormIns"
          type="text"
          name="Apellido"
          placeholder="Apellido"
        ></input>
        <input
          className="inputFormIns"
          type="text"
          name="Apellidos"
          placeholder="Segundo Apellido"
        ></input>

        <input
          className="inputFormIns"
          type="text"
          name="dni"
          placeholder="DNI"
        ></input>

        <input
          className="inputFormIns"
          type="text"
          name="tel"
          placeholder="Tel"
        ></input>
        <button type="submit">Inscribirme</button>
      </form>
      <Toaster />
    </div>
  );
}

export default FormInsc;
