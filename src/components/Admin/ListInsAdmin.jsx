import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";
import utils from "../../utils/time";
import { getEventInscripciones } from "../../logic/Admin/getEventsInscripciones";
import { getInscripciones } from "../../logic/Admin/getInscripciones";
function ListInsAdmin() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }

  const decode = jwtDecode(sessionStorage.token);
  if (decode.rol === 0) {
    window.location.href = "/";
  }

  const [inscripciones, setInscripciones] = useState([]);
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    getEventInscripciones()
      .then((data) => {
        console.log("getEventInscripciones data:", data);
        if (data.error) {
          throw new Error("Error en la conexión a la base de datos");
        } else {
          setList(data);
        }
      })
      .catch((error) => {
    
        toast.error(error.message || "Ocurrió un error"); // Asegúrate de pasar una cadena
      });

    getInscripciones()
      .then((data) => {
        if (!data) {
       
          throw new Error("Error en la conexión a la base de datos");
        } else {
          setInscripciones(data.data);
        }
      })
      .catch((error) => {
       
        toast.error(error.message || "Ocurrió un error"); // Asegúrate de pasar una cadena
      });
  }, []);

  const handleClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id)); // Alterna la visibilidad del componente
  };

  return (
    <div className="divtable">
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table className="tableStyle" style={{ minWidth: "800px" }}>
          <thead>
            <tr>
              <th className="thTdStyle thStyle">Nombre</th>
              <th className="thTdStyle thStyle">Apellido</th>
              <th className="thTdStyle thStyle">Apellidos</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((participante) => (
                <React.Fragment key={participante.id_event}>
                  <tr onClick={() => handleClick(participante.id_event)}>
                    <td className="thTdStyle">{participante.titulo}</td>
                    <td className="thTdStyle">{participante.descr}</td>
                    <td className="thTdStyle">
                      {utils.formatDate(participante.inicio)}
                    </td>
                  </tr>
                  {selectedId === participante.id_event && (
                    <tr>
                      <td className="thTdStyle" colSpan="7">
                        <DetailComponent id={selectedId} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No hay inscripciones disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Toaster />
    </div>
  );
}

function DetailComponent({ id }) {
  return (
    <table className="tableStyle" style={{ minWidth: "800px" }}>
      <thead>
        <tr>
          <th className="thTdStyle thStyle">Nombre</th>
          <th className="thTdStyle thStyle">Apellido</th>
          <th className="thTdStyle thStyle">Apellidos</th>
          <th className="thTdStyle thStyle">Tel</th>
          <th className="thTdStyle thStyle">DNI</th>
          <th className="thTdStyle thStyle">Titulo Inscripcion</th>
          <th className="thTdStyle thStyle">Inscrito</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}

export default ListInsAdmin;
