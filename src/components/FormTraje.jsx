const API = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import error from "../../error";
import toast, { Toaster } from "react-hot-toast";
import "./FormTraje.css";

function FormTraje() {

  const handelRegisterEventTraje = (e) => {
    e.preventDefault();
    const decode = jwtDecode(sessionStorage.token);
    
    const formData = {
      titulo: e.target.titulo.value,
      ubicacion: e.target.ubicacion.value,
      desc: e.target.desc.value,
      dia: e.target.dia.value,
      inicio: e.target.inicio.value,
      fin: e.target.fin.value,
      id: decode.id,
    };
    try {
         error.validateStringNotEmptyNoSpaces(formData.titulo);
        error.validateStringNotEmptyNoSpaces(formData.ubicacion);
        error.validateStringNotEmptyNoSpaces(formData.desc);
        error.validateStringNotEmptyNoSpaces(formData.dia);
        error.validateStringNotEmptyNoSpaces(formData.fin);        
        error.validateId(formData.id); 

      fetch(`${API}traje/addEventTraje.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
         if(data.error){
          toast.error(data.error);
         }
         if(data.success){
          toast.success(data.msn)
         }
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      toast.error(`error: ${error.message}`);
    }
  };
  return (
    <>
      <form onSubmit={handelRegisterEventTraje}>
        <input type="text" placeholder="titulo" name="titulo" />
        <input type="text" placeholder="ubicacion" name="ubicacion" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="date" name="dia" />
        <label>inicio</label>
        <input type="time" name="inicio" /> 
        <label>fin</label>
        <input type="time" name="fin" /> 
        <button type="submit">Añadir </button>
      </form>
      <Toaster />
    </>
  );
}

export default FormTraje;
