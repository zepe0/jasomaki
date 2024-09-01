import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

export function getMyTraje(id) {


  const formData = {
    id: id,
  };

  return fetch(`${API}/traje/myTraje.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      toast.error(`Error fetching data: ${error.message}`);
    });
}
