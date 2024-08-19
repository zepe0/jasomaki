/* eslint-disable react/prop-types */
import  { Toaster } from "react-hot-toast";
import "./FormInsc.css";

import { RegistroEvento } from "../logic/User/addInscripcion";
function FormInsc({ evento }) {
 
  const inscripcion = (e) => RegistroEvento(e,evento);

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
