import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function getMyEvents(data) {
  return fetch(`${API}eventos/getMyEvents.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
   
      return response.json();
    })
    .then((res) => {
      if (res.error) {
        toast.error(res.message);
      }
      if (res.length > 0) {
        return res;
      }
    })
    .catch((error) => {
      toast.error("Error fetching data: ", error);
    });
}
