import { Toaster } from "react-hot-toast";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";
import Nav from "../src/components/Nav";
import { useState } from "react";

function AdminInscripciones() {
  const [refresh, setRefresh] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  function openForm() {
    const dialog = document.getElementById("formadd");
    dialog.showModal();
  }
  function closeForm() {
    const dialog = document.getElementById("formadd");
    setSelectedEvent(null)
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
      <Nav></Nav>
      <button onClick={openForm}>Añadir nuevas inscripciones</button>
      <ListInsAdmin key={refresh} onSelect={handleSelect} />

      <dialog id="formadd">
        <button onClick={closeForm}>X</button>
        <FormInscAdmin onSuccess={refreshList} selectedit={selectedEvent} />
      </dialog>
      <Toaster />
    </>
  );
}

export default AdminInscripciones;
