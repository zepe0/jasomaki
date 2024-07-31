/* import { useState } from "react"; */
/* const API = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react"; */
import "./Traje.css";

function VistaTraje() {
  /* useEffect(() => {
    fetch(`${API}/inscripción/getEvents.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    const decode = jwtDecode(sessionStorage.token);

    const formData = {
      id_user: decode.id,
    };
  }, []); */

  return (
    <div className="container">
      <div className="figure">
        <div className="head">
          <div className="size-label">Sombrero: M</div>
        </div>
        <div className="body">
          <div className="arms">
            <div className="arm left">
              <div className="size-label">Manga Izquierda</div>
            </div>
            <div className="chest">
              <div className="size-label">Chaleco: L</div>
            </div>
            <div className="arm right">
              <div className="size-label">Manga Derecha</div>
            </div>
          </div>
          <div className="skirt">
            <div className="size-label">Falda: S</div>
            <div className="legs">
              <div className="leg left"></div>
              <div className="leg right"></div>
            </div>
          </div>
          <div className="feet">
            {/*   TODO  arreglar estilo para piernas */}
            <div className="foot left"></div>
            <div className="foot right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaTraje;
