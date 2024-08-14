import toast, { Toaster } from "react-hot-toast";
import ListHome from "../src/components/ListHome";
import Nav from "../src/components/Nav";
import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";

function Home() {
 
  useEffect(() => {
    if (sessionStorage.token) {
      const decode = jwtDecode(sessionStorage.token);
      if (decode.rol === 1) {
        window.location.href = "/Admin";
        return;
      }
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
