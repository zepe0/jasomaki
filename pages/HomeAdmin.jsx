import { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";
import ListInsAdmin from "../src/components/ListInsAdmin";
import { jwtDecode } from "jwt-decode";
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
