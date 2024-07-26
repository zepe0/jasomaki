import Nav from "../src/components/Nav";
import error from "../error/index";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function Login() {
  useEffect(() => {
    if (!sessionStorage.token) {
      toast((t) => (
        <span>
          No has iniciado <b>sesión </b>
          <button onClick={() => toast.dismiss(t.id)}>Iniciar</button>
        </span>
      ));

      /* window.location.href = "/"; */
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      nombre: e.target.Nombre.value,
      dni: e.target.DNI.value,
      tel: e.target.tel.value,
    };
    const nombre = e.target.Nombre.value;
    const dni = e.target.DNI.value;
    const tel = e.target.tel.value;
    try {
      error.validateStringNotEmptyOrBlank(nombre);
      error.validateDNI(dni);
      error.validateTel(tel);
      fetch(`${API}/login/login.php`, {
        // Usa la URL directa al servidor PHP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch {
      toast.error("Error al ingresar los datos");
    }
  };

  return (
    <>
      <Nav></Nav>
      <h1>Login</h1>
      <div className="">
        <form className="FormInsc" onSubmit={handleSubmit}>
          <input
            className="inputFormIns"
            type="text"
            name="Nombre"
            placeholder="Nombre"
          ></input>

          <input
            className="inputFormIns"
            type="text"
            name="DNI"
            placeholder="1234567A"
          ></input>

          <input
            className="inputFormIns"
            type="text"
            name="tel"
            placeholder="Tel"
          ></input>
          <button type="submit">Registrar</button>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
