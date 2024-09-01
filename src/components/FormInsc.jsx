/* eslint-disable react/prop-types */

import "./FormInsc.css";

import { RegistroEvento } from "../logic/User/addInscripcion";

function FormInsc({ evento, onInscripcionSuccess }) {
  const inscripcion = (e) =>
    RegistroEvento(e, evento).then((res) => {
     if(res == "success"){
      onInscripcionSuccess();
     }
    });

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
    </div>
  );
}

export default FormInsc;
