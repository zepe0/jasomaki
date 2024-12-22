import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function getEventInscripciones($id) {
  return fetch(`${API}alluser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify($id),
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
