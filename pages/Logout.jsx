import { useNavigate } from "react-router-dom";
import Nav from "../src/components/Nav";
import { useEffect } from "react";

function Logout() {
  const goto = useNavigate();
  useEffect(() => {
    if (sessionStorage.token) {
      delete sessionStorage.token;
      goto("/Login");
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      <h1>Logout</h1>
    </>
  );
}

export default Logout;
