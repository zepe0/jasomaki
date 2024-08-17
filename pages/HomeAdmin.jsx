import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";

import { jwtDecode } from "jwt-decode";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
      <p>Home Admin</p>
      <ListInsAdmin />
      <Toaster />
    </>
  );
}

export default HomeAdmin;
