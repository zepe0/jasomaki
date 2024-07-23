import Nav from "../src/components/Nav";
import error from "../error/index";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.Nombre.value;
    /*   const dni = e.target.DNI.value;
    const tel = e.target.tel.value; */
    const fo = error.validateUsername(nombre);
    if (fo) {
      console.log("error");
      if (fo.message) {
        console.log(fo.message);
      }
    } else {
      console.log("ok");
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
    </>
  );
}

export default Login;
