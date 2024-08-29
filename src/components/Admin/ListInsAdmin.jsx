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
            <div id="card" className={` w-98 ${evento.tipo.includes('Maquillaje') ? 'maquillaje' : evento.tipo.includes('Summer') ?"bgimg":'bgimgW'}  `}key={evento.id}>
          {/*     <IoMdMore onClick={() => toggleDropdown(evento.id)} /> */}
              <div id="Cardinfo " onClick={() => handleClick(evento.id)}>
            
                <div>
                  {evento.img ? (
                    
                    
                      <div className="colum">
                        <big>{evento.nombre}</big>
                        <small>
                          {evento.tipo} <span>{getYear(evento.fecha)}</span>
                        </small>
                      </div>
                    
                  ) : (
                    <div className="">
                      {/*    <img
                        src="./src/img/defaultevent.jpeg"
                        id="imgevento"
                      ></img> */}
                      <div className="colum">
                        <div>
                          <big>{evento.nombre}</big>
                          <small>
                            {evento.tipo} <span>{getYear(evento.fecha)}</span>
                          </small>
                        </div>
                        <div id="buttons">
                          <button onClick={(e) => clikdelet(e, evento.id)}>
                                              <MdDelete />
                                            </button>
                                            <button onClick={(e) => clikedit(e, evento.id)}>
                                              <CiEdit />
                                            </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
             
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




export default ListInsAdmin;
