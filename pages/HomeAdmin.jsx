
import Nav from "../src/components/Nav";

import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminInscripciones from "./AdminInscripciones";
function HomeAdmin() {
  const goto = useNavigate();
  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/Login");
    }
    const decode = jwtDecode(sessionStorage.token);
    if (decode.rol == "0") {
      goto("/");
    }
  }, [goto]);
  return (
    <>
      <Nav></Nav>     
      <AdminInscripciones></AdminInscripciones>
    
    </>
  );
}

export default HomeAdmin;
