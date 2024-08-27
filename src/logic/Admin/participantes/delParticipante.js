import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;
export function delParticipantes(token, id) {
  
  const fromData ={
    idUser: jwtDecode(token).rol,
    idParticipante: id,
    
  }
  return fetch(`${API}Admin/participantes/delParticipantes.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fromData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      toast.error("Error fetching data: ", error);
    });
}
