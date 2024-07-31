import Nav from "../src/components/Nav";
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
    </>
  );
}

export default Traje;
