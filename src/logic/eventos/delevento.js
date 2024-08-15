import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function delEvento(data) {
  return fetch(`${API}eventos/delEventos.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response.success);
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      toast.error("Error fetching data: ", error);
    });
}
