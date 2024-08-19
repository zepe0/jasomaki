import { useState } from "react";
import "./Nav.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdCard } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { FaRegCalendarPlus } from "react-icons/fa";

function Nav() {
  const [isLogin, setLogin] = useState();

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
  }, []);

  return (
    <section className="top">
      <nav id="Nav">
        <li>
          <MdOutlineArrowBackIosNew />
        </li>
        <li>Nombre Apartado</li>
        <li>
          <CgProfile />
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
