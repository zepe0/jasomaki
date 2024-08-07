import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import "./ListEvents.css";
import error from "../../error";

const API = import.meta.env.VITE_API_URL;

function ListEvents() {
  if (!sessionStorage.token) {
    window.location.href = "/";
    return null; // Asegúrate de que no renderice nada si no hay token
  }

  const [events, setEvents] = useState([]);
  const [myevents, setMyEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [inscrito, setInscrito] = useState(false); // Cambiar a `false` inicialmente

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
        setInscrito(false); // Restablecer el estado de inscripción
      });
  }, [inscrito, isModalOpen]);

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

  const handleAddUserInEvent = (e) => {
    e.preventDefault();
    try {
      const decode = jwtDecode(sessionStorage.token);

      
      error.validateStringNotEmptyOrBlank(e.target[1].value);
      error.validateStringNotEmptyOrBlank(e.target[2].value); 
      error.validateStringNotEmptyOrBlank(e.target[3].value); 
      error.validateStringNotEmptyOrBlank(e.target[4].value); 
      error.validateStringNotEmptyOrBlank(e.target[5].value); 
      error.validateDNI(e.target[5].value);
      error.validateTel(e.target[4].value);

      const formData = {
        nombre: e.target[1].value,
        Apellido: e.target[2].value,
        Apellidos: e.target[3].value,
        tel: e.target[4].value,
        dni: e.target[5].value,
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
            toast.error(data.error.message);
          }
          if (data.success) {
            setInscrito(true); // Actualizar el estado de inscripción
            toast.success(data.msn);
            handleCloseModal(); // Cerrar el modal
          }
          if (data.message) toast.error(data.message);
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      {isModalOpen && (
        <dialog id="dialog" open>
          <button onClick={handleCloseModal}>X</button>
          <form onSubmit={handleAddUserInEvent}>
            <fieldset className="form">
              <h2>{selectedEvent ? selectedEvent.titulo : ""}</h2>
              <input type="text" name="Nombre" placeholder="Nombre" />
              <input type="text" name="Apellido" placeholder="Apellido" />
              <input type="text" name="Apellidos" placeholder="Apellidos" />
              <input type="text" name="Tel" placeholder="Tel" />
              <input type="text" name="Dni" placeholder="Dni" />
              <button type="submit">Guardar plaza</button>
            </fieldset>
          </form>
        </dialog>
      )}
      <ul className="listEvent">
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
                <li key={ins.id_event} className="itemListEvent">
                  <h2 className="titulo">
                    {ins.titulo}{" "}
                    {isUserEnrolled ? <i className="fas fa-check"></i> : ""}
                  </h2>
                  <h4 className="desc">{ins.descr}</h4>
                  <div className="footerItem">
                    <div className="times">
                      <p>De {ins.inicio}</p>
                      <p>a {ins.fin}</p>
                    </div>
                    <div>
                      <p>Finaliza en {timeLeftText}</p>
                    </div>
                  </div>
                  {!isUserEnrolled && (
                    <button onClick={(e) => handleOpenModal(e, ins)}>
                      Inscribirme
                    </button>
                  )}
                </li>
              );
            })
        ) : (
          <li>
            <p>
              Sabemos que tienes ganas de Carnaval pero las inscripciones aún no
              empiezan.
            </p>
          </li>
        )}
        <Toaster />
      </ul>
    </section>
  );
}

export default ListEvents;
