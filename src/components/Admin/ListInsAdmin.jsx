import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";
import utils from "../../utils/time";
import { getEventInscripciones } from "../../logic/Admin/getEventsInscripciones";
import { getInscripciones } from "../../logic/Admin/getInscripciones";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// eslint-disable-next-line react/prop-types
function ListInsAdmin({ onSelect }) {
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
  const clikedit = (e,id) => {  
   
    e.stopPropagation();
    const dialog = document.getElementById("formadd");
    dialog.showModal();
    
    onSelect(list.find(list =>list.id === id)); // TODO buscar en el list y mostrar
  };
  const handleClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
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
                      <button>
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

      <Toaster />
    </div>
  );
}

function DetailComponent() {
  const [inscripciones, setInscripciones] = useState([]);
  useEffect(() => {
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
  return (
    <table className="tableStyle" style={{ minWidth: "800px" }}>
      <thead>
        <tr>
          <th className="thTdStyle thStyle">Nombre</th>
          <th className="thTdStyle thStyle">Apellido</th>
          <th className="thTdStyle thStyle">Apellidos</th>
          <th className="thTdStyle thStyle">Tel</th>
          <th className="thTdStyle thStyle">DNI</th>
          <th className="thTdStyle thStyle">Titulo Inscripción</th>
          <th className="thTdStyle thStyle">Inscrito</th>
        </tr>
      </thead>
      <tbody>
        {inscripciones.length != 0 ? (
          <tr>
            <td
              colSpan="7"
              style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
            >
              Sin personas apuntadas aún
            </td>
          </tr>
        ) : (
          inscripciones.map((inscripcion, index) => (
            <tr key={index}>
              <td className="thTdStyle">{inscripcion.nombre}</td>
              <td className="thTdStyle">{inscripcion.apellido}</td>
              <td className="thTdStyle">{inscripcion.apellidos}</td>
              <td className="thTdStyle">{inscripcion.tel}</td>
              <td className="thTdStyle">{inscripcion.dni}</td>
              <td className="thTdStyle">{inscripcion.titulo}</td>
              <td className="thTdStyle">
                {utils.formatDate(inscripcion.inscrito)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ListInsAdmin;
