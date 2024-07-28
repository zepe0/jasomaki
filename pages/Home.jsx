import toast, { Toaster } from "react-hot-toast";
import ListHome from "../src/components/ListHome";
import Nav from "../src/components/Nav";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    if (document.referrer == "http://localhost:5173/ins") {
      toast.error("Para Inscribirte inicia sesión");
    }
    if (document.referrer == "http://localhost:5173/pagos") {
      toast.error("inicia sesión para hacer efectivo tus pagos");
    }
    if (document.referrer == "http://localhost:5173/traje") {
      toast.error("inicia sesión para ver tu traje");
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      <ListHome></ListHome>
      <Toaster />
    </>
  );
}

export default Home;
