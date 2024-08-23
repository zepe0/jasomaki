/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import error from "../../error";
import "./FormInsc.css";
import { generateUID } from "../utils/generateUid";
import { useEffect, useState } from "react";
import { editevents } from "../logic/eventos/editEvent";
import { jwtDecode } from "jwt-decode";
const API = import.meta.env.VITE_API_URL;

function FormInscAdmin({ onSuccess, selectedit }) {
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
        tipo: selectedit.tipo,
      });
    } else {
      setInputValue({
        Titulo: "",
        inicio: "",
        hora: "",
        tipo: "---",
      });
    }
  }, [selectedit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inscripcion = (e) => {
    e.preventDefault();
    if (!inputValue.Titulo) {
      return toast.error("Seleccione un Nombre ");
    }
    if (!inputValue.tipo) {
      return toast.error("Seleccione un tipo de evento");
    }

    if (!inputValue.inicio) {
      return toast.error("Seleccione una fecha ");
    }
    const inicio = new Date(inputValue.inicio);

    const formData = {
      Titulo: inputValue.Titulo,
      hora: inputValue.hora,
      inicio: inicio,
      id: generateUID(),
      tipo: inputValue.tipo,
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
            setInputValue({
              Titulo: "",
              inicio: "",
              hora: "",
              tipo: "",
            });
            const form = document.getElementById("forularioInscripcion");

            form.showModal();
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
      tipo: form.tipo.value,
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
      <h1>Añadir Inscripciones</h1>
      <form className="FormInsc" onSubmit={inscripcion} id={inputValue.id}>
        <input
          className="inputFormIns"
          type="text"
          name="Titulo"
          value={inputValue.Titulo}
          onChange={handleInputChange}
          placeholder="Nombre"
        />

        <select
          className="inputFormIns"
          type="text"
          name="tipo"
          value={inputValue.tipo}
          onChange={handleInputChange}
        >
          <option className="inputFormIns">---</option>
          <option className="inputFormIns">Rua Summer</option>
          <option className="inputFormIns">Rua Winter</option>
          <option className="inputFormIns">Maquillaje Winter</option>
          <option className="inputFormIns">Maquillaje Summer</option>
        </select>
        <input
          className="inputFormIns"
          type="date"
          name="inicio"
          value={inputValue.inicio}
          onChange={handleInputChange}
        />

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

export default FormInscAdmin;
