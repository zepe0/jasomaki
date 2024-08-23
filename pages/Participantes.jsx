import Nav from "../src/components/Nav";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { getAllParticipantes } from "../src/logic/Admin/users/getAllPArticipantes";
import Loading from "../src/components/Loading";

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    getAllParticipantes(jwtDecode(sessionStorage.token).id).then((res) => {
      console.log(res.data);
      setParticipantes(res.data);
    });
  }, []);

  return (
    <>
      <Nav></Nav>
      {loading ? (
        <Loading></Loading>
      ) : participantes.length > 0 ? (
        participantes.map((participante) => {
          return participante.nombre;
        })
      ) : (
        "Sin Participantes aun "
      )}
    </>
  );
}

export default Participantes;
