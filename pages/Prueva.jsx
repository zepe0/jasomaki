import { Link, useNavigate } from "react-router-dom";
import Nav from "../src/components/Nav";
import { useEffect } from "react";
import "./Prueva.css";

function Prueva() {
  const goto = useNavigate();

  useEffect(() => {}, [goto]);
  return (
    <section id="bodyPruevas">
      <nav id="Nav">
        <li>⤵ </li>
        <li>Nombre Apartado</li>
        <li>🤬 </li>
      </nav>

      <section id="botones">
        <div>
          <input type="search" name="" id="" />
          <button>serch</button>
        </div>
        <button></button>
        <button></button>
        <button></button>
        <div id="card">
          <img src="./src/img/defaultevent.jpeg" id="imgevento"></img>
          <div id="Cardinfo">
            <div>
                <big>Nombre Evento</big>
                <small>Rua Summer</small>
            </div>
            <div>
                <button>Inscribirse</button>
                <Link>Gestionar</Link>
            </div>
          </div>
          <medium> Historial de Pagos</medium>
          <li>Lista de pagaos efectuados</li>
          <big>Total : 100 €</big>
          <small>Efectuado : 30 €</small>

          <div>
            <button><small>Ver Detalles</small></button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Prueva;
