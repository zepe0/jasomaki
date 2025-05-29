const API = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
import "./Demo.css";

function Demo() {
  return (
    <section className="demo-container">
      <h1>Demo Page</h1>
      <p className="text">
        Es una APP Demo diseñada MobileFirst. La aplicación incluye varias rutas
        y componentes que simulan un sistema de gestión de inscripciones y
        participantes.
      </p>

      <p className="text">
        Para empezar puede hacer clic a {" "}
        <Link to="/Login" className="btn btn-primary">
          Ir a Login
        </Link>
      </p>
    </section>
  );
}

export default Demo;
