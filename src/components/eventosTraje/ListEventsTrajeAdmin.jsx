import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ListEventsTrajeAdmin.css";

const API = import.meta.env.VITE_API_URL;

function ListEventsTrajeADmin() {
  const [eventos, SetEventos] = useState([]);

  useEffect(() => {
    try {
      fetch(`${API}/traje/getAllEventTraje.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          SetEventos(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      toast.error(`error: ${error.message}`);
    }
  }, []);
  function formatDate(inputDate) {
    const [year, month, day] = inputDate.split("-");
    const shortYear = year.slice(-2);
    return `${day}/${month}/${shortYear}`;
  }
  function formatHour(inputDate) {
    const [hora, min, seg] = inputDate.split(":");
    /*  const shortseg = seg.slice(-2); */
    return `${hora}:${min}`;
  }

  return (
    <div className="">
      {eventos.length > 0 ? (
        eventos.map((evento) => {
          return (
            <section key={evento.idEventoTraje} className="itemlist">
              <h2>{evento.titulo}</h2>
              <h4>{evento.descr}</h4>
              <p>
                El {formatDate(evento.dia)} de {formatHour(evento.inicio)} a{" "}
                {formatHour(evento.fin)}
              </p>
              <button>X</button>
              <button>Editar</button>
            </section>
          );
        })
      ) : (
        <p> no hay eventos</p>
      )}
      <Toaster />
    </div>
  );
}

export default ListEventsTrajeADmin;
