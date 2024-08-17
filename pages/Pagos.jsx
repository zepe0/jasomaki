import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";
import Stripe from "../src/components/Srtipe/Stripe";

function Pagos() {
  if (!sessionStorage.token) {
    window.location.href = "/";
  }
  return (
    <>
      <Nav></Nav>
      <h1>Pagos</h1>
      <Stripe></Stripe>
      <Toaster></Toaster>
    </>
  );
}

export default Pagos;
