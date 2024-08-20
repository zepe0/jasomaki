import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

export function getPagosEvento(data) {
  return fetch(`${API}pagos/getPagosEvento.php`, {
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
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      toast.error("Error fetching data: ", error);
    });
}
