import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

export function getName(email) {


  const formData = {
    email: email.email,
  };

  return fetch(`${API}user`, {
    method: "post",
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
