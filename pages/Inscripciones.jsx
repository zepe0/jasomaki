import FormInsc from "../src/components/FormInsc";
import Nav from "../src/components/Nav";

function Inscripciones() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }

  return (
    <>
      <Nav></Nav>
      <FormInsc></FormInsc>
    </>
  );
}

export default Inscripciones;
