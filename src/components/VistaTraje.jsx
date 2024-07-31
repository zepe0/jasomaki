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
    <section>
       <div className="mannequin">
        <div className="tiara-label">Tiara - Talla</div>
        <div className="head">
            <div className="tiara">
                <div className="feather feather-left"></div>
                <div className="feather feather-center"></div>
                <div className="feather feather-right"></div>
            </div>
        </div>
        <div className="neck"></div>
        <div className="torso">
            <div className="chest-label">Pecho - Talla</div>
        </div>
        <div className="skirt"></div>
        <div className="left-arm">
            <div className="upper-arm"></div>
            <div className="lower-arm"></div>
            <div className="hand"></div>
        </div>
        <div className="right-arm">
            <div className="upper-arm"></div>
            <div className="lower-arm"></div>
            <div className="hand"></div>
        </div>
        <div className="left-leg">
            <div className="leg-label">Pierna - Talla</div>
            <div className="upper-leg"></div>
            <div className="lower-leg"></div>
            <div className="foot"></div>
        </div>
        <div className="right-leg">
            <div className="upper-leg"></div>
            <div className="lower-leg"></div>
            <div className="foot"></div>
        </div>
    </div>
    </section>
  );
}

export default VistaTraje;
