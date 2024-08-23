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
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedHeadwear, setSelectedHeadwear] = useState("");
  const [selectedTops, setSelectedTops] = useState([]);
  const [selectedBottoms, setSelectedBottoms] = useState([]);

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

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleHeadwearChange = (event) => {
    setSelectedHeadwear(event.target.value);
  };

  const handleTopsChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTops((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleBottomsChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBottoms((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const inscripcion = (e) => {
    e.preventDefault();

    const formData = {
      genero: selectedGender,
      cabeza: selectedHeadwear,
      pecho: selectedTops,
      pierna: selectedBottoms,
      id_user: jwtDecode(sessionStorage.token).id,
    };
   
    try {
      fetch(`${API}/traje/setTraje.php`, {
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
            toast.success(data.msn);
          } else {
            toast.error(data.error);
          }
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
          toast.error("Error de red.");
        });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
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
    <div>
      <h1>Añadir Traje</h1>
      <form className="FormInsc" onSubmit={inscripcion}>
        <div>
          <label
            className={`custom-checkbox ${
              selectedGender === "hombre" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="hombre"
              checked={selectedGender === "hombre"}
              onChange={handleGenderChange}
              className="hidden-checkbox"
            />
            <AiOutlineMan />
          </label>

          <label
            className={`custom-checkbox ${
              selectedGender === "mujer" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="mujer"
              checked={selectedGender === "mujer"}
              onChange={handleGenderChange}
              className="hidden-checkbox"
            />
            <AiOutlineWoman />
          </label>

          <label
            className={`custom-checkbox ${
              selectedGender === "nino" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value="nino"
              checked={selectedGender === "nino"}
              onChange={handleGenderChange}
              className="hidden-checkbox"
            />
            <MdChildCare />
          </label>
        </div>

        <div>
          <label
            className={`custom-checkbox ${
              selectedHeadwear === "Sombrero" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="cabeza"
              value="Sombrero"
              checked={selectedHeadwear === "Sombrero"}
              onChange={handleHeadwearChange}
              className="hidden-checkbox"
            />
            <FaRedhat />
          </label>
          <label
            className={`custom-checkbox ${
              selectedHeadwear === "Tiara" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="cabeza"
              value="Tiara"
              checked={selectedHeadwear === "Tiara"}
              onChange={handleHeadwearChange}
              className="hidden-checkbox"
            />
            <GiTiara />
          </label>
          <label
            className={`custom-checkbox ${
              selectedHeadwear === "nada" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="cabeza"
              value="nada"
              checked={selectedHeadwear === "nada"}
              onChange={handleHeadwearChange}
              className="hidden-checkbox"
            />
            <MdBlockFlipped />
          </label>
        </div>

        <div>
          <big>Pecho</big>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="tops"
              value="Body"
              checked={selectedTops.includes("Body")}
              onChange={handleTopsChange}
            />
            Body
          </label>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="tops"
              value="Chaleco"
              checked={selectedTops.includes("Chaleco")}
              onChange={handleTopsChange}
            />
            Chaleco
          </label>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="tops"
              value="Camiseta"
              checked={selectedTops.includes("Camiseta")}
              onChange={handleTopsChange}
            />
            Camiseta
          </label>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="tops"
              value="Casaca"
              checked={selectedTops.includes("Casaca")}
              onChange={handleTopsChange}
            />
            Casaca
          </label>
        </div>

        <div>
          <big>Pierna</big>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="bottoms"
              value="Pantalon"
              checked={selectedBottoms.includes("Pantalon")}
              onChange={handleBottomsChange}
            />
            Pantalon
          </label>
          <label>
            <input
              className="inputFormIns"
              type="checkbox"
              name="bottoms"
              value="Falda"
              checked={selectedBottoms.includes("Falda")}
              onChange={handleBottomsChange}
            />
            Falda
          </label>
        </div>

        {inputValue.id ? (
          <button type="button" onClick={editevent}>
            Editar
          </button>
        ) : (
          <button type="submit">Crear</button>
        )}
      </form>
    </div>
  );
}

export default FormInscTrajeAdmin;
