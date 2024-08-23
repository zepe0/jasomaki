/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { getEvents } from "../logic/eventos/geteventos";
import { getMyEvents } from "../logic/eventos/getMisEventos";
import { jwtDecode } from "jwt-decode";
import { getYear } from "../utils/time";
/* import { FaTshirt } from "react-icons/fa";
import { PiPantsThin } from "react-icons/pi";
import { GiSkirt } from "react-icons/gi";
import { FaVest } from "react-icons/fa";
import { GiTiara } from "react-icons/gi"; */
import { PiPantsFill } from "react-icons/pi";

import FormInsc from "./FormInsc";
import FormTraje from "./FormTraje";
import { FaVest } from "react-icons/fa6";

function ListaEventos() {
  if (!sessionStorage.token) {
    window.location.href = "/Login";
    return null;
  }

  const [eventos, setEventos] = useState([]);
  const [myeventos, setMyEventos] = useState([]);
  const [mytraje, setMyTraje] = useState([]);
  const [selectEvent, setSelectEvent] = useState([]);
  const [Detalles, setDetalles] = useState(null);
  useEffect(() => {
    getEvents().then((res) => {
      setEventos(res);
    });
    let user = jwtDecode(sessionStorage.token);
    user = {
      id_user: user.id,
    };

    getMyEvents(user).then((res) => {
      setMyEventos(res);
    });
  }, []);
  const openform = (id) => {
    setSelectEvent(id);
    const form = document.getElementById("forularioInscripcion");

    form.showModal();
  };
  const verDetalles = (id) => {
    const eEncontrado = eventos.find((evento) => evento.id == id);
    if (eEncontrado) {
      setDetalles(eEncontrado);

      console.log(Detalles);
    }
  };
  return (
    <section id="lista">
      {eventos && eventos.length > 0 ? (
        eventos.map((evento) => {
          return (
            <div key={evento.id} id="card">
              {evento.img ? (
                <img
                  src={`./src/img/${evento.img}`}
                  id="imgevento"
                  alt="Evento"
                />
              ) : (
                <img src="./src/img/defaultevent.jpeg" id="imgevento"></img>
              )}

              <div id="Cardinfo">
                <div className="colum">
                  <big>{evento.nombre}</big>
                  <small>
                    {evento.tipo} <span>{getYear(evento.fecha)}</span>
                  </small>
                </div>
                <div className="colum">
                  {myeventos.some(
                    (myevento) => myevento.evento_id === evento.id
                  ) ? (
                    <p>Ya inscrito</p>
                  ) : (
                    <button
                      onClick={() => {
                        openform(evento.id);
                      }}
                    >
                      Inscribirse
                    </button>
                  )}
                </div>
              </div>
              <div className="cardPagos">
                {evento.tipo.includes("Rua") ? (
                  mytraje.length > 0 ? (
                    <small>
                      {" "}
                      <FaVest className="prenda" />
                      <span>L</span> <PiPantsFill className="prenda" />
                      <span>L</span>{" "}
                    </small>
                  ) : (
                    <div>
                      <big>Traje</big>
                      <small>
                        <FormTraje></FormTraje>
                      </small>
                      <div className="cardPagos">
                        <big>Total : 100 €</big>
                        <small>Efectuado : 30 €</small>
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>

              <div>
                <button
                  className="btnEvent"
                  onClick={() => verDetalles(evento.id)}
                >
                  <small>Ver Detalles</small>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div id="card">
          <p>NO hay nada programado aun </p>
        </div>
      )}
      <dialog id="forularioInscripcion">
        <button>X</button>
        <FormInsc evento={selectEvent}></FormInsc>
      </dialog>
    </section>
  );
}

export default ListaEventos;
