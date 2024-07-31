const API = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import "./ListInsAdmin.css";

function ListInsAdmin() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  const decode = jwtDecode(sessionStorage.token);
  if (decode.rol === 0) {
    window.location.href = "/";
  }
  const [list, setList] = useState([]);
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

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table className="tableStyle" style={{ minWidth: "800px" }}>
          <thead>
            <tr>
              <th className="thTdStyle thStyle">Nombre</th>
              <th className="thTdStyle thStyle">Apellido</th>
              <th className="thTdStyle thStyle">Apellidos</th>
              <th className="thTdStyle thStyle">Tel</th>
              <th className="thTdStyle thStyle">Dni</th>
              <th className="thTdStyle thStyle">Inscrito</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((participante) => (
                <tr key={participante.ins_id}>
                  <td className="thTdStyle">{participante.nombre}</td>
                  <td className="thTdStyle">{participante.apellido}</td>
                  <td className="thTdStyle">{participante.apellidos}</td>
                  <td className="thTdStyle">{participante.tel}</td>
                  <td className="thTdStyle">{participante.dni}</td>
                  <td className="thTdStyle">{participante.fecha_insc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
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

export default ListInsAdmin;
