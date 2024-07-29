import toast, { Toaster } from "react-hot-toast";
import error from "../../error";
import "./FormInsc.css";
import { jwtDecode } from "jwt-decode";

function FormInscAdmin() {
  const API = import.meta.env.VITE_API_URL;
  const inscripcion = (e) => {
    e.preventDefault();
    const inicio = new Date(e.target.inicio.value);
    const fin = new Date(e.target.fin.value);
    const decode = jwtDecode(sessionStorage.token);
    const formData = {
      Titulo: e.target.Titulo.value,
      Descripcion: e.target.Descripcion.value,
      inicio: inicio,
      fin: fin,
      id: decode.id,
    };
    try {
      error.validateStringNotEmptyNoSpaces(formData.Titulo);
      error.validateStringNotEmptyNoSpaces(formData.Descripcion);
      error.validateStringNotEmptyNoSpaces(formData.id);
      error.validateDate(formData.inicio);
      error.validateDate(formData.fin);
      error.validateId(formData.id);

      fetch(`${API}/inscripción/addins.php`, {
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
          name="Titulo"
          placeholder="Titulo"
        ></input>
        <input
          className="inputFormIns"
          type="text"
          name="Descripcion"
          placeholder="Descripción"
        ></input>

        <input className="inputFormIns" type="date" name="inicio"></input>

        <input className="inputFormIns" type="date" name="fin"></input>
        <button type="submit">Crear</button>
      </form>
      <Toaster />
    </div>
  );
}

export default FormInscAdmin;
