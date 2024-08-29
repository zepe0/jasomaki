import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import error from "../../../error";
const API = import.meta.env.VITE_API_URL;

export function RegistroEvento(e, evento) {
  e.preventDefault();
  const decode = jwtDecode(sessionStorage.token);
  const formData = {
    nombre: e.target.nombre.value,
    Apellido: e.target.Apellido.value,
    Apellidos: e.target.Apellidos.value,
    tel: e.target.tel.value,
    dni: e.target.dni.value,
    id: decode.id,
    id_evento: evento,
  };

  try {
    error.validateStringNotEmptyNoSpaces(formData.nombre);
    error.validateStringNotEmptyNoSpaces(formData.Apellido);
    error.validateStringNotEmptyNoSpaces(formData.Apellidos);
    error.validateStringNotEmptyNoSpaces(formData.tel);
    error.validateStringNotEmptyNoSpaces(formData.dni);
    error.validateDNI(formData.dni);
    error.validateTel(formData.tel);
    error.validateId(formData.id);
    error.validateId(evento);

    return fetch(`${API}/inscripción/ins.php`, {
      // Usa la URL directa al servidor PHP
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msn);
          const form = document.getElementById("forularioInscripcion");
          form.close();
          return "success";
        }
        if (data.error) {
          toast.error(data.error);
        }
        return null;
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud:", error);
        return null;
      });
  } catch (error) {
    toast.error(`error: ${error.message}`);
    return null;
  }
}
