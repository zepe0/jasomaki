import { useState } from "react";
import "./Nav.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { getName } from "../logic/User/getname";

function Nav({ update }) {
  const [isLogin, setLogin] = useState();
  const [name, setName] = useState();
  const goto = useNavigate();
  useEffect(() => {
    if (sessionStorage.token) {
      try {
        jwtDecode(sessionStorage.token);
        setLogin(true);
        getName(jwtDecode(sessionStorage.token)).then((name) => {
          if (name) setName(name.user.nombre);
        });
      } catch (error) {
        console.error("Token decoding failed:", error);
        setLogin(false);
      }
    }
  }, [update]);
  const logout = () => {
    sessionStorage.removeItem("token");
    goto("/login");
  };
  const goBack = () => {
    goto(-1); // Navega a la página anterior
  };
  const goevent = () => {
    goto("/Admin");
  };
  const goparticipantes = () => {
    goto("/Admin/Participantes");
  };
  const gopagos = () => {
    goto("/pagos");
  };
  return (
    <section className="top">
      <nav id="Nav">
        <li>
          <MdOutlineArrowBackIosNew onClick={goBack} />
        </li>
        {jwtDecode(sessionStorage.token).rol == 1 ? (
          <div>
            <button onClick={goevent}>Eventos</button>{" "}
            <button onClick={goparticipantes}>Participantes</button>{" "}
            <button onClick={gopagos}>Pagos</button>
          </div>
        ) : (
          ""
        )}

        {name ? (
          name
        ) : jwtDecode(sessionStorage.token).rol == 1 ? (
          ""
        ) : (
          <li>Inscribete en un evento para guardar tu nombre</li>
        )}

        <li>
          <BiExit onClick={logout} className="btnLogout" />
        </li>
      </nav>
    </section>
  );
}

export default Nav;
