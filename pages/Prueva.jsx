import "./Prueva.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../src/components/Nav";
import ListaEventos from "../src/components/Listaeventos";

function HomeUser() {
  const goto = useNavigate();
  if(!sessionStorage.token){
   goto("/Login")
  }

  useEffect(() => {}, [goto]);
  return (
    <section id="bodyPruevas">
      <Nav></Nav>
      <ListaEventos></ListaEventos>
    </section>
  );
}

export default HomeUser;
