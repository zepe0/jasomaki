import { jwtDecode } from "jwt-decode";
import error from "../error/index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function Login() {
  // Redirige al usuario a la página de inicio si ya está autenticado
  // Si el usuario ya tiene un token, lo redirige a la página de inicio
  const goto = useNavigate();
  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/Login");
    }
  }, [goto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      pws: e.target.pass.value,
    };

    try {
      error.validateStringNotEmptyOrBlank(formData.email);
      error.validateStringNotEmptyOrBlank(formData.pws);
      error.validatePassword(formData.pws);

      fetch(`${API}login`, {
        // Usa la URL directa al servidor PHP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            sessionStorage.token = data.token;
            if (jwtDecode(data.token).rol === 0) {
              toast.success("Bienvenido");
              goto("/user");
            } else {
              goto("/Admin");
              toast.success("Bienvenido");
            }
          }
          if (data.error) {
            toast.error(
              "Credenciales incorrectas, por favor intente de nuevo."
            );
          }
        })
        .catch((error) => {
          toast.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="">
        <form className="FormInsc" onSubmit={handleSubmit}>
          <input
            className="inputFormIns"
            type="text"
            name="email"
            placeholder="Email"
            required
            defaultValue="demo@demo.es"
          ></input>

          <input
            className="inputFormIns password-input "
            type="password"
            name="pass"
            placeholder="Contraseña"
            required
            defaultValue="1234"
          ></input>

          <button type="submit">Entrar</button>
        </form>
        <p className="demo-text">
          No tienes Cuenta <a href="/register">Regístrate</a>
        </p>
        <p className="demo-credentials">
          Esta diseñada para ser usada en dispositivos móviles y tablets.
          <br />
          <br />
          Se te recomienda usar las credenciales de demo para probar la
          aplicación:
          <br />
          <br />
          <span className="demo-label">Email:</span> <span>demo@demo.es</span>
          <br />
          <span className="demo-label">Contraseña:</span> <span>1234</span>
          <br />
        
        </p>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
