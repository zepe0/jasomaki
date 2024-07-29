import { useState } from "react";
import "./Nav.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function Nav() {
  const [isLogin, setLogin] = useState();

  useEffect(() => {
    if (sessionStorage.token) {
      try {
        jwtDecode(sessionStorage.token);
        setLogin(true); // Solo se establece en true si el decodificado es exitoso
      } catch (error) {
        console.error("Token decoding failed:", error);
        setLogin(false);
      }
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <ul className="Nav">
          <li className="itemnav">
            <a href="/ins">
              <img
                src="../src/icons/ins.png"
                className="img_menu"
                alt="img_menu"
              />
            </a>
          </li>
          <li className="itemnav">
            <a href="/traje">
              <img
                src="../src/icons/mask.png"
                className="img_menu"
                alt="img_menu"
              />
            </a>
          </li>
          <li className="itemnav">
            <a href="/pagos">
              <img
                src="../src/icons/tarjeta.png"
                className="img_menu_cad"
                alt="img_menu"
              />
            </a>
          </li>
          <li className="itemnav">
            <a href="/Perfil">
              <img
                src="../src/icons/avatarDefault.png"
                className="img_menu"
                alt="img_menu"
              />
            </a>
          </li>
          <li className="itemnav">
            <a href="/Logout">Logout</a>
          </li>
        </ul>
      ) : (
        <ul className="Nav">
          <li className="itemnav">
            <a href="/Perfil">
              <img
                src="../src/icons/avatarDefault.png"
                className="img_menu"
                alt="img_menu"
              />
            </a>
          </li>
          <li className="itemnav">
            <a href="/">Home</a>
          </li>
        </ul>
      )}
    </>
  );
}

export default Nav;
