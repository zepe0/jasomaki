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
        Para comenzar le proporcionaremos unas credenciales de administración  demo para que pueda
        ver el uso de la aplicación, si desea ver la parte de usuario elimine admin del correo.
     
      </p>
      <ul className="lista">
        <li>
          Usuario: <strong>demoadmin@demo.es</strong>
        </li>
        <li>
          Contraseña: <strong>1234</strong>
        </li>
      </ul>
      <p className="text">
        Una vez que inicie sesión, podrá acceder a las diferentes secciones de
        la aplicación, como inscripciones y perfil.
      </p>

      <p className="text">¡Esperamos que disfrute de la demostración!</p>

      <p className="text">
        Nota: Esta es una aplicación de demostración y no contiene datos reales. Puedes experimentar retraso con las peticiones ya que la api esta alojada en un servidor gratuito.
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
