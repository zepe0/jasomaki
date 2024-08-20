import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";
import { getInscripciones } from "../../logic/Admin/getInscripciones";
import { getEventInscripciones } from "../../logic/Admin/getEventsInscripciones";
import { delEvento } from "../../logic/eventos/delevento";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { getYear } from "date-fns";
// eslint-disable-next-line react/prop-types
function ListInsAdmin({ onSelect, onSuccess }) {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }

  const decode = jwtDecode(sessionStorage.token);
  if (decode.rol === 0) {
    window.location.href = "/";
  }

  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    getEventInscripciones()
      .then((data) => {
        if (data.error) {
          throw new Error("Error en la conexión a la base de datos");
        } else {
          setList(data);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Ocurrió un error");
      });
  }, []);
  const clikedit = (e, id) => {
    e.stopPropagation();
    const dialog = document.getElementById("formadd");
    dialog.showModal();
    onSelect(list.find((list) => list.id === id));
  };
  const handleClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const clikdelet = (e, id) => {
    e.stopPropagation();
    const fromData = {
      id: id,
      user: decode.id,
      rol: decode.rol,
    };
    delEvento(fromData);

    onSuccess();
  };
  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("show");
    }
  };
  return (
    <div id="lista">
      <h3>Eventos creados</h3>
      <section id="lista">
        {list.length > 0 ? (
          list.map((evento) => (
            <div id="card" key={evento.id}>
              <button onClick={() => toggleDropdown( evento.id)}>
                <IoMdMore />
              </button>
            
                <div id="myDropdown" className="dropdown-content " ref={dropdownRef}>
                  <a href="#">Opción 1</a>
                  <a href="#">Opción 2</a>
                  <a href="#">Opción 3</a>
                </div>
             
              <div id="Cardinfo" onClick={() => handleClick(evento.id)}>
                {/*   <button onClick={(e) => clikdelet(e, evento.id)}>
                    <MdDelete />
                  </button> */}
                {evento.img ? (
                  <img
                    src={`./src/img/${evento.img}`}
                    id="imgevento"
                    alt="Evento"
                  />
                ) : (
                  <img src="./src/img/defaultevent.jpeg" id="imgevento"></img>
                )}
                <div id="Cardinfo">
                  <div className="colum">
                    <big>{evento.nombre}</big>
                    <small>
                      Rua Summer <span>{getYear(evento.fecha)}</span>
                    </small>
                  </div>
                </div>
              </div>
              {selectedId === evento.id && <DetailComponent id={selectedId} />}
            </div>
          ))
        ) : (
          <section>
            <div
              colSpan="7"
              style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
            >
              No hay inscripciones disponibles
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

function DetailComponent({ id }) {
  const [inscripciones, setInscripciones] = useState([]);
  useEffect(() => {
    getInscripciones(id)
      .then((res) => {
        if (!res) {
          throw new Error("Error en la conexión a la base de datos");
        } else {
          setInscripciones(res.data);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Ocurrió un error");
      });
  }, []);
  return (
    <table> <h3>Inscripciones</h3>
      {inscripciones.length == 0 ? (
        <tr>
          <td
            colSpan="2"
            style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
          >
            Sin personas apuntadas aún
          </td>
        </tr>
      ) : (
       
        inscripciones.map((inscripcion, index) => (
          <tr
            key={index}
            id="fo"
            style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
            colSpan="5"
          >
            <td className="thTdStyle">{inscripcion.nombre}</td>
            <td className="thTdStyle">{inscripcion.apellido}</td>
            <td className="thTdStyle">{inscripcion.apellidodos}</td>
            <td className="thTdStyle">{inscripcion.tel}</td>
            <td className="thTdStyle">{inscripcion.dni}</td>
          </tr>
        ))
      )}
    </table>
  );
}

export default ListInsAdmin;
