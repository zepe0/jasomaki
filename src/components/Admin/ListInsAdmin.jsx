import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";
import utils from "../../utils/time";

const API = import.meta.env.VITE_API_URL;

function ListInsAdmin() {
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
    const decode = jwtDecode(sessionStorage.token);

    const formData = {
      rol: decode.rol,
    };

    fetch(`${API}/inscripción/getInscripciones.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        toast.error("Error fetching data: ", error);
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
              <th className="thTdStyle thStyle">Tel</th>
              <th className="thTdStyle thStyle">DNI</th>
              <th className="thTdStyle thStyle">Titulo Inscripcion</th>
              <th className="thTdStyle thStyle">Inscrito</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((participante) => (
                <React.Fragment key={participante.ins_id}>
                  <tr onClick={() => handleClick(participante.ins_id)}>
                    <td className="thTdStyle">{participante.nombre}</td>
                    <td className="thTdStyle">{participante.apellido}</td>
                    <td className="thTdStyle">{participante.apellidos}</td>
                    <td className="thTdStyle">{participante.tel}</td>
                    <td className="thTdStyle">{participante.dni}</td>
                    <td className="thTdStyle">{participante.titulo}</td>
                    <td className="thTdStyle">
                      {utils.resetData(
                        utils.formatHour(participante.fecha_insc)
                      )}
                    </td>
                  </tr>
                  {selectedId === participante.ins_id && (
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
