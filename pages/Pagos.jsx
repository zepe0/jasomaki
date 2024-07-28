import Nav from "../src/components/Nav";

function Pagos() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  return (
    <>
      <Nav></Nav>
      <h1>Pagos</h1>
    </>
  );
}

export default Pagos;
