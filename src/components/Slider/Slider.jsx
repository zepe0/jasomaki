import { useEffect, useRef, useState } from "react";
import "./Slider.css"; // Importa el archivo CSS que contiene el estilo
import { getEvents } from "../../logic/eventos/geteventos";
import { getYear } from "date-fns";
import { getMyTraje } from "../../logic/traje/getMyTraje";
import { jwtDecode } from "jwt-decode";
import { getMyEvents } from "../../logic/eventos/getMisEventos";
import FormTraje from "../FormTraje";
import { PiPantsFill } from "react-icons/pi";
import { FaVest } from "react-icons/fa6";

function Slider() {
  useEffect(() => {
    fetchEventos();
    fetchMyEventos();
    fetchTraje();
  }, []);
  const [eventos, setEventos] = useState([]);
  const [selectEvent, setSelectEvent] = useState([]);
  const [myeventos, setMyEventos] = useState([]);
  const [mytraje, setMyTraje] = useState([]);
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % eventos.length;
    setSelectedIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + eventos.length) % eventos.length;
    setSelectedIndex(prevIndex);
    scrollToCard(prevIndex);
  };

  const scrollToCard = (index) => {
    const card = containerRef.current.children[index];
    card.scrollIntoView({ behavior: "smooth", inline: "center" });
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
    /* onEventChange(); */
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrev} className="nav-button">
        ↩
      </button>
      <div className="cards-wrapper" ref={containerRef}>
        {eventos.map((card, index) => (
          <div
            key={card.id}
            className={`card ${selectedIndex === index ? "selected" : ""} ${
              card.tipo.includes("Maquillaje")
                ? "maquillaje"
                : card.tipo.includes("Summer")
                ? "bgimg"
                : "bgimgW"
            }`}
          >
            <div>
              <div className="colum">
                {myeventos.some(
                  (myevento) => myevento.evento_id === card.id
                ) ? (
                  <div className="">
                    <p className="check"> ✔ </p>
                    <big>{card.nombre}</big>
                    <small>
                      {card.tipo} <span>{getYear(card.fecha)} </span>
                    </small>
                  </div>
                ) : (
                  <div className="colum">
                    <big>{card.nombre}</big>
                    <small>
                      {card.tipo} <span>{getYear(card.fecha)}</span>
                    </small>
                    <button
                      onClick={() => {
                        openform(card.id);
                      }}
                    >
                      Inscribirse
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="cardPagos">
              {card.tipo.includes("Rua") &&
              myeventos.some((myevento) => myevento.evento_id === card.id) ? (
                mytraje.length > 0 ? (
                  <small>
                    {mytraje.some(
                      (traje) => traje.anio == Number(getYear(card.fecha))
                    ) ? (
                      <div>
                        <FaVest className="prenda" />
                        <span>
                          {
                            mytraje.find(
                              (traje) =>
                                traje.anio == Number(getYear(card.fecha))
                            ).pecho
                          }
                        </span>{" "}
                        <PiPantsFill className="prenda" />
                        <span>
                          {
                            mytraje.find(
                              (traje) =>
                                traje.anio == Number(getYear(card.fecha))
                            ).pierna
                          }
                        </span>{" "}
                      </div>
                    ) : (
                      <FormTraje
                        onInscripcionSuccess={handleInscripcionSuccess}
                        idevento={card.id}
                      ></FormTraje>
                    )}
                  </small>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
      <button onClick={handleNext} className="nav-button">
        ↪
      </button>
    </div>
  );
}

export default Slider;
