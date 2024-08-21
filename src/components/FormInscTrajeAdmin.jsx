/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import error from "../../error";
import "./FormInsc.css";
import { generateUID } from "../utils/generateUid";
import { useEffect, useState } from "react";
import { editevents } from "../logic/eventos/editEvent";
import { jwtDecode } from "jwt-decode";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { MdChildCare } from "react-icons/md";
import { FaRedhat } from "react-icons/fa6";
import { GiTiara } from "react-icons/gi";
import { MdBlockFlipped } from "react-icons/md";

const API = import.meta.env.VITE_API_URL;

function FormInscTrajeAdmin({ onSuccess, selectedit }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState({
    Titulo: selectedit ? selectedit.nombre : "",
    inicio: selectedit ? selectedit.fecha : "",
    hora: selectedit ? selectedit.hora : "",
  });

  useEffect(() => {
    if (selectedit) {
      setInputValue({
        Titulo: selectedit.nombre,
        inicio: selectedit.fecha,
        hora: selectedit.hora,
        id: selectedit.id,
      });
    } else {
      setInputValue({
        Titulo: "",
        inicio: "",
        hora: "",
      });
    }
  }, [selectedit]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const inscripcion = (e) => {
    e.preventDefault();

    const inicio = new Date(inputValue.inicio);

    const formData = {
      Titulo: inputValue.Titulo,
      hora: inputValue.hora,
      inicio: inicio,
      id: generateUID(),
    };

    try {
      error.validateStringNotEmptyOrBlank(formData.Titulo);
      error.validateStringNotEmptyOrBlank(formData.id);
      error.validateDate(formData.inicio);
      error.validateId(formData.id);

      fetch(`${API}/inscripción/addins.php`, {
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
  const editevent = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    const formData = {
      id: form.id,
      titulo: form.Titulo.value,
      fecha: form.inicio.value,
      hora: form.hora.value,
      rol: jwtDecode(sessionStorage.token).rol,
      user: jwtDecode(sessionStorage.token).id,
    };

    editevents(formData).then((data) => {
      if (data.success) {
        toast.success(data.msn);
        onSuccess();
      } else {
        toast.error(data.error);
      }
    });
  };

  return (
    <div className="">
      <h1>Añadir Traje</h1>
      <form className="FormInsc" onSubmit={inscripcion} id={inputValue.id}>
        Traje
        {/*        Todo cambiar estilo a lelect añadiendo dos selects por pierna y
        pecho dejando en -- en vacio */}
        <div>
          <label
            className={`custom-checkbox ${
              selectedOption === "hombre" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="hombre"
              checked={selectedOption === "hombre"}
              onChange={handleOptionChange}
              className="hidden-checkbox"
            />
            <AiOutlineMan />
          </label>

          <label
            className={`custom-checkbox ${
              selectedOption === "mujer" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="mujer"
              checked={selectedOption === "mujer"}
              onChange={handleOptionChange}
              className="hidden-checkbox"
            />
            <AiOutlineWoman />
          </label>

          <label
            className={`custom-checkbox ${
              selectedOption === "nino" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="nino"
              checked={selectedOption === "nino"}
              onChange={handleOptionChange}
              className="hidden-checkbox"
            />
            <MdChildCare />
          </label>
        </div>
        cabeza
        <div id="cabeza">
          <label
            className={`custom-checkbox ${
              selectedOption === "Sombrero" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="cabeza"
              value="Sombrero"
              checked={selectedOption === "Sombrero"}
              onChange={handleOptionChange}
              className="hidden-checkbox"
            />
            <FaRedhat />
          </label>
          <label
            className={`custom-checkbox ${
              selectedOption === "Tiara" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="cabeza"
              value="Tiara"
              checked={selectedOption === "Tiara"}
              onChange={handleOptionChange}
              className="hidden-checkbox"
            />
            <GiTiara />
          </label>
          <label
            className={`custom-checkbox ${
              selectedOption === "nada" ? "selected" : ""
            }`}
          >
            <input
              className="hidden-checkbox"
              type="radio"
              name="cabeza"
              value="nada"
              checked={selectedOption === "nada"}
              onChange={handleOptionChange}
            />
            <MdBlockFlipped />
          </label>
        </div>
        <big>Pecho</big>
        <div id="cabeza">
          <div>
            <label>
              <input
                className="inputFormIns"
                type="checkbox"
                name="Body"
                value="Body"
              />
              Body
            </label>
            <label>
              <input
                className="inputFormIns"
                type="checkbox"
                name="Chaleco"
                value="Chaleco"
              />
              Chaleco
            </label>
            <label>
              <input
                className="inputFormIns"
                type="checkbox"
                name="Camiseta"
                value="Camiseta"
              />
              Camiseta
            </label>
            <label>
              <input
                className="inputFormIns"
                type="checkbox"
                name="Casaca"
                value="Casaca"
              />
              Casaca
            </label>
          </div>
        </div>
        <big>Pierna</big>
        <div id="cabeza">
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="Pantalon"
              value="Pantalon"
            />
            Pantalon
          </label>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="Falda"
              value="Falda"
            />
            Falda
          </label>
        </div>
        {inputValue.id ? (
          <button type="button" onClick={editevent}>
            Editar{" "}
          </button>
        ) : (
          <button type="submit">Crear</button>
        )}
      </form>
    </div>
  );
}

export default FormInscTrajeAdmin;
