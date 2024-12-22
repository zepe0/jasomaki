import error from "../error/index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const goto = useNavigate();

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
          if (!data.error ) {
            sessionStorage.token = data.token;
            if (data.rol === 0) {
              goto("/");
            } else {
              goto("/Admin");
            }
          }
          if (data.error == true) {
            toast.error(data.msn);
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
          ></input>

          <input
            className="inputFormIns password-input  "
            type="password"
            name="pass"
            placeholder="Contraseña"
          ></input>

          <button type="submit">Entrar</button>
        </form>
        <p>
          No tienes Cuenta <a href="/register">Regístrate</a>
        </p>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
