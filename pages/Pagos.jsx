import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";
import Stripe from "../src/components/Srtipe/Stripe";
import { useState } from "react";

function Pagos() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  const [selecQuantia, setQuantia] = useState([]);
  const pagar = (e) => {
    e.preventDefault();
    const quantia = e.target.value;
    setQuantia(quantia);
    const dialog = document.getElementById("pagar");
    dialog.showModal();
  };
  return (
    <>
      <Nav></Nav>
      <h1>Pagos</h1>
      <button onClick={pagar} value={30}>30€</button>
    
      <button onClick={pagar} value={90}>90€</button>
      <dialog id="pagar">
        <Stripe cuantia={selecQuantia}></Stripe>
      </dialog>

      <Toaster></Toaster>
    </>
  );
}

export default Pagos;
