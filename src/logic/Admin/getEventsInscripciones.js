
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function getEventInscripciones() {


  return fetch(`${API}eventos/allevents`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    }
    
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
