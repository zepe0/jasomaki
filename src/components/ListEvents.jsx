import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function ListEvents() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`${API}/inscripción/getEvents.php`, {
      // Usa la URL directa al servidor PHP
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        setEvents(data);
      });
  }, []);

  return (
    <ul>
      {events.map((ins) => (
        <li key={ins.ins_id}>
          <form>
            <input placeholder={ins.titulo}></input>
            <input placeholder={ins.descr}></input>
            <input placeholder={ins.inicio}></input>
            <input placeholder={ins.fin}></input>
            <input placeholder={ins.id_user} type="hidden"></input>
          </form>
        </li>
      ))}
    </ul>
  );
}

export default ListEvents;
