import { useState } from "react";
import "./Nav.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdCard } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { FaRegCalendarPlus } from "react-icons/fa";
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
  return (
    <section className="top">
      <nav id="Nav">
        <li>
          <MdOutlineArrowBackIosNew />
        </li>
        <li>Nombre Apartado</li>
        <li>
          <CgProfile onClick={logout} />
        </li>
      </nav>
      <section id="botones">
        <div>
          <input type="search" name="" id="" />
          <button>
            <MdSearch />
          </button>
        </div>
        <p>
          Filtrar:{" "}
          <button>
            <IoMdCard />
          </button>{" "}
          <button>
            <FaRegCalendarPlus />
          </button>
        </p>
      </section>
    </section>
  );
}

export default Nav;
