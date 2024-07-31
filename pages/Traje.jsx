import Nav from "../src/components/Nav";
import Todo from "../src/components/patrones/Todo";
import VistaTraje from "../src/components/VistaTraje";

function Traje() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  return (
    <>
      <Nav></Nav>
      <h1>Traje</h1>
      <VistaTraje></VistaTraje>
      <Todo></Todo>
    </>
  );
}

export default Traje;
