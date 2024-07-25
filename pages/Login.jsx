import Nav from "../src/components/Nav";
import error from "../error/index";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.Nombre.value;
    const dni = e.target.DNI.value;
    const tel = e.target.tel.value;

    try {
      error.validateUsername(nombre);
      error.validateStringNotEmptyOrBlank(dni);
      error.validateStringNotEmptyOrBlank(tel);
      error.validateDNI(dni);
      error.validateTel(tel);
      const formData = {
        nombre: nombre,
        tel: tel,
        dni: dni,
      };
      /* TODO-> COMPROBAR */
      const response = fetch("https://example.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      const data = response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      toast.error(error.message);
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
            placeholder="DNI"
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
