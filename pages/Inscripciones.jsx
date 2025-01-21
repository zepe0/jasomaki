import { useState } from "react";
import ListEvents from "../src/components/ListEvents";
import Nav from "../src/components/Nav";
import { jwtDecode } from "jwt-decode";

function Inscripciones() {
 
  if (!sessionStorage.token) {
    window.location.href = "/Login";
    return
  }
  const decode = jwtDecode(sessionStorage.token);
  if (decode.rol != 0) {
    window.location.href = "/Admin/ins";
    return
  }
  

  return (
    <>
      <Nav ></Nav>
      <ListEvents  />
    </>
  );
}

export default Inscripciones;
