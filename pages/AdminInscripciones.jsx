import { Toaster } from "react-hot-toast";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";

import { useState } from "react";

function AdminInscripciones() {
  const [refresh, setRefresh] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  if (!sessionStorage.token) {
    window.location.href = "/";
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
        <button onClick={openForm}>Crear Traje</button>
        <button onClick={openForm}>Pagos</button>
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
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
}

export default AdminInscripciones;
