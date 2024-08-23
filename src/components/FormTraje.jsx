const API = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import error from "../../error";
import toast, { Toaster } from "react-hot-toast";
import "./FormTraje.css";
import { useState } from "react";

function FormTraje() {
  const [selectedOptionPecho, setPecho] = useState("");
  const [selectedOptionPierna, setPierna] = useState("");
  const handelPechoSelect = (event) => {
    setPecho(event.target.value);
  };
  const handelPiernaSelect = (event) => {
    setPierna(event.target.value);
  };

  const handelRegisterEventTraje = (e) => {
    e.preventDefault();
    if (selectedOptionPecho == "---") {
      return toast.error("Seleciona la talla de pecho");
    }
    if (selectedOptionPierna == "---") {
      return toast.error("Seleciona la talla de piernas");
    }
    const formData = {
      pecho: selectedOptionPecho,
      pierna: selectedOptionPierna,
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
            toast.success(data.msn);
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
        <button type="submit">Añadir </button>
      </form>
      <Toaster />
    </>
  );
}

export default FormTraje;
