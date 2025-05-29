const API = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
import "./Demo.css";

function Demo() {
  return (
    <section className="demo-container">
      <h1>Demo Page</h1>
      <p className="text">
        Es una APP Demo diseñada para móviles. La aplicación incluye varias rutas
        y componentes que simulan un sistema de gestión de inscripciones y
        participantes.
      </p>
      <p className="text">       
        Actualmente se encuentra con migración de Api puedes experimentar
        errores en la asignación de trajes.
      </p>
      <p className="text">
        Para empezar puede hacer clic en{" "}
        <Link to="/Login" className="btn btn-primary">
         {" "} Login ↪ 
        </Link>
      </p>
    </section>
  );
}

export default Demo;
