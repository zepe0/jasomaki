import { useState } from "react";
import Nav from "../src/components/Nav";
import FormTraje from "../src/components/FormTraje";
import ListEventsTrajeADmin from "../src/components/eventosTraje/ListEventsTrajeAdmin";


function AdminTraje() {
  const [openinscripcion, SetInscripcion] = useState();
  const handelOpenIscripcion = () => {
    SetInscripcion(true);
  };
  const handelCloseIscripcion = () => {
    SetInscripcion(false);
  };

  return (
    <>
      <Nav></Nav>

      <button onClick={handelOpenIscripcion}> Nueva inscripción </button>
      {openinscripcion ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handelCloseIscripcion}>X</button>
            <FormTraje />
          </div>
        </div>
      ) : (
        ""
      )}
      <ListEventsTrajeADmin />
     
    </>
  );
}

export default AdminTraje;
