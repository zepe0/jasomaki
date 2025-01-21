import "./Prueva.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../src/components/Nav";
import ListaEventos from "../src/components/Listaeventos";

function HomeUser() {
  const [navUpdate, setNavUpdate] = useState(false);
  const goto = useNavigate();
 /*  if(!sessionStorage.token){
   goto("/Login")
  } */
  const handleEventChange = () => {
    setNavUpdate((prev) => !prev); 
  };
  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/Login");
    }
  }, [goto]);
  return (
    <section id="bodyPruevas">
      <Nav update={navUpdate}></Nav>
      <ListaEventos onEventChange={handleEventChange}></ListaEventos>
      
    </section>
  );
}

export default HomeUser;
