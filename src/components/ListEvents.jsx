import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import "./ListEvents.css";

const API = import.meta.env.VITE_API_URL;

function ListEvents() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  const [events, setEvents] = useState([]);
  const [myevents, setMyEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [inscrito, setinscrito] = useState(null);
  useEffect(() => {
    fetch(`${API}/inscripción/getEvents.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
    const decode = jwtDecode(sessionStorage.token);

    const formData = {
      id_user: decode.id,
    };
    fetch(`${API}/inscripción/getMyEvents.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMyEvents(data);
        setinscrito(false);
      });
  }, [inscrito]);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const getTimeLeftText = (endDate) => {
    const end = new Date(endDate);
    const days = differenceInDays(end, currentDate);
    const hours = differenceInHours(end, currentDate) % 24;
    const minutes = differenceInMinutes(end, currentDate) % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleOpenModal = (e, data) => {
    e.preventDefault();
    setSelectedEvent(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  const handeleAddUserInEvent = (e) => {
    e.preventDefault();

    const decode = jwtDecode(sessionStorage.token);

    const formData = {
      nombre: e.target[0].value,
      Apellido: e.target[1].value,
      Apellidos: e.target[2].value,
      tel: e.target[3].value,
      dni: e.target[4].value,
      id_user: decode.id,
      id_event: selectedEvent.id_event,
    };

    fetch(`${API}/inscripción/AgregarUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          setinscrito(true);
          toast.success(data.msn);
          setIsModalOpen(false);
          setSelectedEvent(null);
        }
        if (data.message) toast.error(data.message);
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud:", error);
      });
  };
  return (
    <ul>
      {events.length !== 0 ? (
        events
          .filter((ins) => {
            const eventEndDate = new Date(ins.fin);
            eventEndDate.setHours(0, 0, 0, 0);
            return eventEndDate >= currentDate;
          })
          .map((ins) => {
            const timeLeftText = getTimeLeftText(ins.fin);
            const isUserEnrolled = myevents.some(
              (event) => event.id_event === ins.id_event
            );
            return (
              <li key={ins.id_event}>
                <section className="itemListEvent">
                  <div className="titulo">
                    <h2 className="titulo">
                    
                      {ins.titulo}{" "}
                      {isUserEnrolled ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <button onClick={() => handleOpenModal(event, ins)}>
                          Inscribirme
                        </button>
                      )}{" "}
                    </h2>
                  </div>
                  <h4 className="">{ins.descr} </h4>

                  <div className="times">
                    <p className="">
                      De {ins.inicio} a {ins.fin}{" "}
                    </p>

                    <p>Finaliza en {timeLeftText}</p>
                  </div>
                </section>
              </li>
            );
          })
      ) : (
        <li>
          <p>
            Sabemos que tienes ganas de Carnaval pero la Inscripciones aun no
            empiezan{" "}
          </p>
        </li>
      )}
      {isModalOpen && (
        <dialog id="" open>
          <button onClick={handleCloseModal}>X</button>
          <h2>{selectedEvent.titulo}</h2>
          <p>{selectedEvent.descr}</p>
          <form onSubmit={handeleAddUserInEvent}>
            <input type="text" name="Nombre" placeholder="Nombre" id="" />
            <input type="text" name="Apellido" placeholder="Apellido" id="" />
            <input type="text" name="Apellidos" placeholder="Apellidos" id="" />
            <input type="text" name="Tel" placeholder="Tel" id="" />
            <input type="text" name="Dni" placeholder="Dni" id="" />
            <button type="submit">Guardar plaza</button>
          </form>
        </dialog>
      )}
      <Toaster />
    </ul>
  );
}

export default ListEvents;
