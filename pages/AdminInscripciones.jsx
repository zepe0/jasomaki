
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";

import { useState } from "react";
import FormInscTraje from "../src/components/FormInscTrajeAdmin";
import { useNavigate } from "react-router-dom";

function AdminInscripciones() {
  const [refresh, setRefresh] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const goto = useNavigate();
  if (!sessionStorage.token) {
    goto("/")
  }
  function openForm(e) {
    const dialog = document.getElementById("formadd");
    dialog.showModal();
    if (e) {
      setSelectedEvent(null); // Resetea el estado a null
    }
  }

  function closeForm() {
    const dialog = document.getElementById("formadd");
    setSelectedEvent(null);
    dialog.close();
  }

  function refreshList() {
    closeForm();
    setRefresh((prev) => !prev);
   
  }
  function handleSelect(id) {
    setSelectedEvent(id);
    openForm();
  }
  return (
    <>
      <div>
        <button onClick={openForm}>Añadir Evento</button>
       
      </div>
      <ListInsAdmin
        key={refresh}
        onSelect={handleSelect}
        onSuccess={refreshList}
      />

      <dialog id="formadd">
        <button onClick={closeForm}>X</button>
        <FormInscAdmin onSuccess={refreshList} selectedit={selectedEvent} />
      </dialog>
      <dialog id="formaddTraje">
        <button onClick={closeForm}>X</button>

        <FormInscTraje onSuccess={refreshList} selectedit={selectedEvent} />
      </dialog>
    </>
  );
}

export default AdminInscripciones;
