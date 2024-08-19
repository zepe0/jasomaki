import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export function getEvents() {
  return fetch(`${API}eventos/getEvents.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
    
      return response.json();
    })
    .then((res) => {
      if (res.error) {
        toast.error(res.error);
      }
      if (res.length > 0) {
        return res;
      }
    })
    .catch((error) => {
      toast.error("Error fetching data: ", error);
    });
}
