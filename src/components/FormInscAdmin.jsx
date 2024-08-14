import toast, { Toaster } from "react-hot-toast";
import error from "../../error";
import "./FormInsc.css";

import { generateUID } from "../utils/generateUid";

// eslint-disable-next-line react/prop-types
function FormInscAdmin({ onSuccess }) {
  const API = import.meta.env.VITE_API_URL;
  const inscripcion = (e) => {
    e.preventDefault();
    const inicio = new Date(e.target.inicio.value);

    const formData = {
      Titulo: e.target.Titulo.value,
      hora: e.target.hora.value,
      inicio: inicio,
      id: generateUID(),
    };

    try {
      error.validateStringNotEmptyOrBlank(formData.Titulo);
      error.validateStringNotEmptyOrBlank(formData.id);
      error.validateDate(formData.inicio);
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
          if (data.success) {
            onSuccess();
            return toast.success(data.msn);
          }
          toast.error(data.error);
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
      <h1>Añadir Inscripciones</h1>
      <form className="FormInsc" onSubmit={inscripcion}>
        <input
          className="inputFormIns"
          type="text"
          name="Titulo"
          placeholder="Titulo"
        ></input>

        <input className="inputFormIns" type="date" name="inicio"></input>
        <input className="inputFormIns" type="time" name="hora"></input>
        <button type="submit">Crear</button>
      </form>
      <Toaster />
    </div>
  );
}

export default FormInscAdmin;
