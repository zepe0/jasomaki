import { useState } from "react";
import Nav from "../src/components/Nav";
import FormTraje from "../src/components/FormTraje";


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

      <button onClick={handelOpenIscripcion}> + </button>
      {openinscripcion ? (
        <div>
          <button onClick={handelCloseIscripcion}>X</button>
          <FormTraje />
        </div>
      ) : (
        ""
      )}
     
    </>
  );
}

export default AdminTraje;
