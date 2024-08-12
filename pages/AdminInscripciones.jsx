import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";
import Nav from "../src/components/Nav";

function AdminInscripciones() {
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
  return (
    <>
      <Nav></Nav>
      <button onClick={openForm}>Añadir nuevas inscripciones</button>
      <ListInsAdmin />
      
      <dialog id="formadd">
      <button onClick={closeForm}>X</button>
        <FormInscAdmin></FormInscAdmin>
      </dialog>
    </>
  );
}

export default AdminInscripciones;
