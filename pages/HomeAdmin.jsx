import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";

import { jwtDecode } from "jwt-decode";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
import { useNavigate } from "react-router-dom";
function HomeAdmin() {
  const goto = useNavigate();

  if (!sessionStorage.token) {
    goto("/Login");
   
  }
  const decode = jwtDecode(sessionStorage.token);
  if (decode.rol == "0") {
    goto("/");
  }
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
