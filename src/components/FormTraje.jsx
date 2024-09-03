const API = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import error from "../../error";
import toast from "react-hot-toast";
import "./FormTraje.css";
import { useState } from "react";

function FormTraje({ onInscripcionSuccess }) {
  const [selectedOptionPecho, setPecho] = useState("");
  const [selectedOptionPierna, setPierna] = useState("");
  const [selectedOptiontraje, setTraje] = useState("");
  const handelPechoSelect = (event) => {
    setPecho(event.target.value);
  };
  const handelPiernaSelect = (event) => {
    setPierna(event.target.value);
  };
  const handeltrajaSelect = (event) => {
    setTraje(event.target.value);
   
  };
  const handelRegisterEventTraje = (e) => {
    e.preventDefault();
   
    if (selectedOptionPecho == "---" || selectedOptionPecho == "") {
      return toast.error("Seleciona la talla de pecho");
    }
    if (selectedOptionPierna == "---" || selectedOptionPierna == "") {
      return toast.error("Seleciona la talla de piernas");
    }
    if (selectedOptiontraje == "---" || selectedOptiontraje == "") {
      return toast.error("Seleciona tu traje");
    }
    const formData = {
      pecho: selectedOptionPecho,
      pierna: selectedOptionPierna,
      traje: selectedOptiontraje,
      id_user: jwtDecode(sessionStorage.token).id,
    };
    try {
      fetch(`${API}traje/setTraje.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.message);
            onInscripcionSuccess();
          }
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      toast.error(`error: ${error.message}`);
    }
  };
  return (
    <>
      <form onSubmit={handelRegisterEventTraje}>
        <div style={{ textAlign: "center" }}>Selecciona tu traje</div>
        <div className="btnform">
          <label htmlFor="traje">
            Traje : {""}
            <select onChange={handeltrajaSelect} name="pecho" id="pecho">
              <option value="---">---</option>
              <option value="Chicho">Chicho</option>
              <option value="Chica">Chica</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
            </select>
          </label>
          <label htmlFor="pecho">
            Pecho : {""}
            <select onChange={handelPechoSelect} name="pecho" id="pecho">
              <option value="---">---</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XL</option>
            </select>
          </label>
          <label htmlFor="Piernas">
            Piernas : {""}{" "}
            {/* TODO cambiar por Iconos segun sexo del participante */}
            <select onChange={handelPiernaSelect} name="Piernas" id="Piernas">
              <option value="---">---</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XL</option>
            </select>
          </label>
        </div>
        <div className="center">
          <button type="submit">Añadir </button>
        </div>
      </form>
    </>
  );
}

export default FormTraje;
