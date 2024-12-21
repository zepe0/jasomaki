/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { getEvents } from "../logic/eventos/geteventos";
import { getMyEvents } from "../logic/eventos/getMisEventos";
import { jwtDecode } from "jwt-decode";
import { getYear } from "../utils/time";
/*  import { FaTshirt } from "react-icons/fa";
import { PiPantsThin } from "react-icons/pi";
import { GiSkirt } from "react-icons/gi"; */
import { FaVest } from "react-icons/fa";

import { PiPantsFill } from "react-icons/pi";

import FormInsc from "./FormInsc";
import FormTraje from "./FormTraje";
import { getMyTraje } from "../logic/traje/getMyTraje";

function ListaEventos({ onEventChange }) {
  if (!sessionStorage.token) {
    window.location.href = "/Login";
    return null;
  }

  const [eventos, setEventos] = useState([]);
  const [myeventos, setMyEventos] = useState([]);
  const [mytraje, setMyTraje] = useState([]);
  const [selectEvent, setSelectEvent] = useState([]);

  useEffect(() => {
    fetchEventos();
    fetchMyEventos();
    fetchTraje();
  }, []);

  const fetchEventos = () => {
    getEvents().then((res) => {
      setEventos(res);
    });
  };
  const fetchTraje = () => {
    getMyTraje(jwtDecode(sessionStorage.token).id).then((res) => {
      setMyTraje(res);
    });
  };
  const fetchMyEventos = () => {
    let user = jwtDecode(sessionStorage.token);
    user = { id_user: user.id };
    getMyEvents(user).then((res) => {
      setMyEventos(res);
    });
  };

  const openform = (id) => {
    setSelectEvent(id);
    const form = document.getElementById("forularioInscripcion");
    form.showModal();
  };

  const closeForm = () => {
    const form = document.getElementById("forularioInscripcion");
    form.close();
  };

  const handleInscripcionSuccess = () => {
    fetchEventos();
    fetchMyEventos();
    fetchTraje();
    closeForm();
    onEventChange();
  };

  return (
    <section id="lista">
      {eventos && eventos.length > 0 ? (
        <div className="listEvent">
          {eventos.map((evento) => (
            <div
              className={` ${
                evento.tipo.includes("Maquillaje")
                  ? "maquillaje"
                  : evento.tipo.includes("Summer")
                  ? "bgimg"
                  : "bgimgW"
              }   itemListEvent`}
              key={evento.id}
            >
              <div id="Cardinfo" className="colum">
                <div className="colum">
                  <big>{evento.nombre} </big>
                  <small>
                    {evento.tipo} <span>{getYear(evento.fecha)}</span>
                  </small>
                </div>
                <div className="colum">
                  {myeventos.some(
                    (myevento) => myevento.evento_id === evento.id
                  ) ? (
                    <p className="check"> ✔ </p>
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
                {evento.tipo.includes("Rua") &&
                myeventos.some(
                  (myevento) => myevento.evento_id === evento.id
                ) ? (
                  mytraje.length > 0 ? (
                    <small>
                      {mytraje.some(
                        (traje) => traje.anio == Number(getYear(evento.fecha))
                      ) ? (
                        <div className="colum">
                          <FaVest className="prenda" />
                          <span>
                            {
                              mytraje.find(
                                (traje) =>
                                  traje.anio == Number(getYear(evento.fecha))
                              ).pecho
                            }
                          </span>{" "}
                          <PiPantsFill className="prenda" />
                          <span>
                            {
                              mytraje.find(
                                (traje) =>
                                  traje.anio == Number(getYear(evento.fecha))
                              ).pierna
                            }
                          </span>{" "}
                        </div>
                      ) : (
                        <FormTraje
                          onInscripcionSuccess={handleInscripcionSuccess}
                          idevento={evento.id}
                        ></FormTraje>
                      )}
                    </small>
                  ) : (
                    <div className="colum">
                      <FormTraje
                        onInscripcionSuccess={handleInscripcionSuccess}
                      ></FormTraje>

                      <div className="cardPagos">
                        {/* <big>Total : 100 €</big>
                      <small>Efectuado : 30 €</small> */}
                      </div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="card">
          <p>NO hay nada programado aun </p>
        </div>
      )}
      <dialog id="forularioInscripcion">
        <button onClick={closeForm}>X</button>
        <FormInsc
          evento={selectEvent}
          onInscripcionSuccess={handleInscripcionSuccess}
        ></FormInsc>
      </dialog>
    </section>
  );
}

export default ListaEventos;
