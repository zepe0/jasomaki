import Nav from "../src/components/Nav";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { getAllParticipantes } from "../src/logic/Admin/users/getAllPArticipantes";
import Loading from "../src/components/Loading";
import { useNavigate } from "react-router-dom";
import { delParticipantes } from "../src/logic/Admin/participantes/delParticipante";
import { getYear } from "date-fns";

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const goto = useNavigate();

  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/Login");
    }
    if (sessionStorage.token) {
      const decode = jwtDecode(sessionStorage.token);
      if (decode.rol === 1) {
        window.location.href = "/Admin";
        return;
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    const intialdata = {
      rol: jwtDecode(sessionStorage.token).id,
      tipo: "Rua Summer",
      fecha: getYear(new Date()),
    };
    getAllParticipantes(intialdata).then((res) => {
      if (res && res.data) {
        setParticipantes(res.data);
      }
      if (res === null) setParticipantes([]);

      setLoading(false);
    });
  }, [setParticipantes]);
  const filtrar = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      rol: jwtDecode(sessionStorage.token).id,
      tipo: e.target.rua.value,
      fecha: e.target.año.value,
    };
    getAllParticipantes(data).then((res) => {
      if (res && res.data) {
        setParticipantes(res.data);
      }
      if (res === null) setParticipantes([]);

      setLoading(false);
    });
  };
  function onEdit(id) {
    console.log(participantes.find((participantes) => participantes.id === id));
  }
  function onDelete(id) {
    delParticipantes(sessionStorage.token, id);
  }
  return (
    <>
      <Nav></Nav>
      <div>
        <button>Añadir Evento</button>
        <button>Ver Participantes</button>
        <button>Pagos</button>
      </div>
      <form onSubmit={filtrar}>
        <input type="text" placeholder="año" name="año" />
        <select name="rua">
          <option value={""}>---</option>
          <option value={"Rua Summer"}>Rua Summer</option>
          <option value={"Rua Winter"}>Rua Winter</option>
        </select>
        <button type="submit">serch</button>
      </form>
      {loading ? (
        <Loading></Loading>
      ) : participantes.length > 0 ? (
        participantes.map((participante) => {
          return (
            <div key={participante.id} style={{ display: "flex" }}>
              <tr>
                <td>{participante.nombre}</td>
                <td>{participante.apellido}</td>
                <td>{participante.dni}</td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => onEdit(participante.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </button>
                  <button onClick={() => onDelete(participante.idevento)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            </div>
          );
        })
      ) : (
        "Sin Participantes aun "
      )}
    </>
  );
}

export default Participantes;
