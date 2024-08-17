import { jwtDecode } from "jwt-decode";
import Nav from "../src/components/Nav";
import Todo from "../src/components/patrones/Todo";
/* 
import VistaTraje from "../src/components/VistaTraje"; 
*/
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Traje() {
  const token = jwtDecode(sessionStorage.token);

  const goto = useNavigate();
  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/login");
    }
   
    if (token.rol === "1") {
      goto("/Admin/traje");
    }
  }, [goto]);
  return (
    <>
      <Nav></Nav>
      <h1>Traje</h1>   
      <Todo></Todo>
    </>
  );
}

export default Traje;
