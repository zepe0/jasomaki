import Nav from "../src/components/Nav";

function Traje() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  return (
    <>
      <Nav></Nav>
      <h1>Traje</h1>
    </>
  );
}

export default Traje;
