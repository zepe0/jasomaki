import { useNavigate } from "react-router-dom";
import Nav from "../src/components/Nav";
import { useEffect } from "react";

function Perfil() {
  const goto = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      goto("/Login");
    }
  }, [goto]);
  return (
    <>
      <Nav></Nav>
      <h1>Perfil</h1>
    </>
  );
}

export default Perfil;
