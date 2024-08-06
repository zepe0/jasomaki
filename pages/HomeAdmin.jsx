import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";

import { jwtDecode } from "jwt-decode";
import ListInsAdmin from "../src/components/Admin/ListInsAdmin";
function HomeAdmin() {

  if (!sessionStorage.token) {
    window.location.href = "/";
    return;
  }
  const decode = jwtDecode(sessionStorage.token);
 
  if (decode.rol === 0) {
    window.location.href = "/";
    return;
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
