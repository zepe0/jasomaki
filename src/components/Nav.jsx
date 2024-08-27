import { useState } from "react";
import "./Nav.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [isLogin, setLogin] = useState();
  const goto = useNavigate();
  useEffect(() => {
    if (sessionStorage.token) {
      try {
        jwtDecode(sessionStorage.token);
        setLogin(true);
      } catch (error) {
        console.error("Token decoding failed:", error);
        setLogin(false);
      }
    }
  }, [isLogin]);
  const logout = () => {
    sessionStorage.removeItem("token");
    goto("/login");
  };
  const goBack = () => {
    goto(-1); // Navega a la página anterior
  };
  return (
    <section className="top">
      <nav id="Nav">
        <li>
          <MdOutlineArrowBackIosNew onClick={goBack} />
        </li>
        <li>
          <input type="search" name="" id="" />
          <button>
            <MdSearch />
          </button>
        </li>
        <li>
          <CgProfile onClick={logout} className="btnLogout" />
        </li>
      </nav>
    </section>
  );
}

export default Nav;
