import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function getInscripciones() {
  const decode = jwtDecode(sessionStorage.token);

  const formData = {
    rol: decode.rol,
  };

  return fetch(`${API}/inscripción/getInscripciones.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      // Registrar el texto de la respuesta para depuración
      return response.text().then((text) => {
      
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error(`Failed to parse JSON: ${e.message}`);
        }
      });
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      toast.error(`Error fetching data: ${error.message}`);
    });
}
