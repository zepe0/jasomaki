import toast, { Toaster } from "react-hot-toast";
import Nav from "../src/components/Nav";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/jasomaki/api/login/login2.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Agregar otros encabezados si es necesario
      },
      // Si necesitas enviar datos, agrega el cuerpo de la solicitud
      // body: JSON.stringify({ key: 'value' })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        toast.error("Respuesta del servidor:", data);
      })
      .catch((error) => {
       toast.error("Hubo un problema con la solicitud:", error);
      });
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
      <Toaster/>
    </>
  );
}

export default Login;
