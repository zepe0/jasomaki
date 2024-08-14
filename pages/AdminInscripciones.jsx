import { Toaster } from "react-hot-toast";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";
import Nav from "../src/components/Nav";
import { useState } from "react";

function AdminInscripciones() {
  const [refresh, setRefresh] = useState(false);
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  function openForm() {
    const dialog = document.getElementById("formadd");
    dialog.showModal();
  }
  function closeForm() {
    const dialog = document.getElementById("formadd");
    dialog.close();
  }

  function refreshList() {
    closeForm();
    setRefresh((prev) => !prev);
  }
  return (
    <>
      <Nav></Nav>
      <button onClick={openForm}>Añadir nuevas inscripciones</button>
      <ListInsAdmin key={refresh} />

      <dialog id="formadd">
        <button onClick={closeForm}>X</button>
        <FormInscAdmin onSuccess={refreshList} />
      </dialog>
      <Toaster />
    </>
  );
}

export default AdminInscripciones;
