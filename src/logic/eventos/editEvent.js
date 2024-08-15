import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function editevents(data) {
  return fetch(`${API}eventos/editEventos.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
