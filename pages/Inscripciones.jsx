import ListEvents from "../src/components/ListEvents";
import Nav from "../src/components/Nav";

function Inscripciones() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }

  return (
    <>
      <Nav></Nav>
      <ListEvents />
    </>
  );
}

export default Inscripciones;
