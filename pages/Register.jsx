import toast, { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";
import "./Register.css";
import error from "../error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const goto = useNavigate();
  useEffect(() => {
    if (sessionStorage.token) {
      goto("../");
    }
  }, [goto]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.pass.value;
    const nombre = e.target.nombre.value;
    const dni = e.target.dni.value;

    //VALIDADOR

    let Usernew = "";
    try {
      error.validateEmail(email);
      error.validatePassword(password);
      Usernew = {
        email: email,
        pws: password,
        nombre: nombre,
        dni: dni,
      };
    } catch (error) {
      toast.error(error.message);
    }

    // PETICIÓN

    fetch('https://apijasomaki.onrender.com/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Usernew),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        sessionStorage.token = data.token;
        toast.success(data.success);
        goto("/");
      })
      .catch((error) => {
        toast.error("Hubo un problema con la solicitud:", error);
      });
  };
  return (
    <>
    
      <h1>
        Únete a la Familia<span> Ja Som Aki</span>
      </h1>
      <div className="">
        <form className="FormReg" onSubmit={handleSubmit}>
          <input
            className="inputFormReg"
            type="text"
            name="email"
            placeholder="Email"
          ></input>

          <input
            className="inputFormReg "
            type="text"
            name="nombre"
            placeholder="Nombre"
          ></input>
           <input
            className="inputFormReg "
            type="text"
            name="dni"
            placeholder="Dni"
          ></input>
           <input
            className="inputFormReg password-input "
            type="password"
            name="pass"
            placeholder="Contraseña"
          ></input>

          <button type="submit" className="btn_register">
            Registrar
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default Register;
