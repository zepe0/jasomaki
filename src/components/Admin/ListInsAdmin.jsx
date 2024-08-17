import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";
import { getInscripciones } from "../../logic/Admin/getInscripciones";
import { getEventInscripciones } from "../../logic/Admin/getEventsInscripciones";
import { delEvento } from "../../logic/eventos/delevento";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
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

  return (
    <div className="divtable">
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <h3>Eventos creados</h3>
        <table className="tableStyle" style={{ minWidth: "800px" }}>
          <thead>
            {/*    <tr>
              <th className="thTdStyle thStyle">Titulo</th>
              <th className="thTdStyle thStyle">dia</th>
              <th className="thTdStyle thStyle"></th>
            </tr> */}
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((evento) => (
                <React.Fragment key={evento.id}>
                  <tr onClick={() => handleClick(evento.id)}>
                    <td className="thTdStyle">{evento.nombre}</td>
                    <td className="thTdStyle">{evento.fecha}</td>
                    <td>
                      <button onClick={(e) => clikedit(e, evento.id)}>
                        <CiEdit />
                      </button>
                      <button onClick={(e) => clikdelet(e, evento.id)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                  {selectedId === evento.id && (
                    <tr>
                      <td className="thTdStyle" colSpan="3">
                        <DetailComponent id={selectedId} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
                >
                  No hay inscripciones disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
    <table style={{ minWidth: "800px" }}>
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
            colSpan= "5"
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
