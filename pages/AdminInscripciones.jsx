import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import FormInscAdmin from "../src/components/FormInscAdmin";
import Nav from "../src/components/Nav";

function AdminInscripciones() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }

  return (
    <>
      <Nav></Nav>
      <FormInscAdmin></FormInscAdmin>
      <ListInsAdmin />
    </>
  );
}

export default AdminInscripciones;
