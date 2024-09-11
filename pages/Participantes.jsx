import Nav from "../src/components/Nav";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SlOptionsVertical } from "react-icons/sl";

import { jwtDecode } from "jwt-decode";
import { getAllParticipantes } from "../src/logic/Admin/users/getAllPArticipantes";
import Loading from "../src/components/Loading";
import { useNavigate } from "react-router-dom";
import { delParticipantes } from "../src/logic/Admin/participantes/delParticipante";
import { getYear } from "date-fns";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { BsTrash3 } from "react-icons/bs";
import ConfirmationDialog from "../src/components/ConfirmDialog";

function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPersona, setTotalPersonas] = useState([]);
  const [init, setInit] = useState({
    rol: jwtDecode(sessionStorage.token).rol,
    tipo: "Rua Summer",
    fecha: getYear(new Date()),
  });
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const goto = useNavigate();

  useEffect(() => {
    if (!sessionStorage.token) {
      goto("/Login");
    }
    if (sessionStorage.token) {
      const decode = jwtDecode(sessionStorage.token);
      if (decode.rol === 1) {
        window.location.href = "/Admin";
        return;
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    const intialdata = {
      rol: jwtDecode(sessionStorage.token).rol,
      tipo: "Rua Summer",
      fecha: getYear(new Date()),
    };
    getAllParticipantes(intialdata).then((res) => {
      if (res && res.data) {
        setLoading(false);
        setParticipantes(res.data);
        res.data.reduce((acum, persona) => {
          if (!acum[persona.sexo]) {
            acum[persona.sexo] = 0;
          }

          acum[persona.sexo]++;
          setTotalPersonas(acum);
        }, {});
      }
      if (res === null) setParticipantes([]);
    });
  }, [setParticipantes, setLoading, goto, setInit ,setFormState],);
  const filtrar = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      rol: jwtDecode(sessionStorage.token).rol,
      tipo: e.target.rua.value,
      fecha: e.target.año.value,
    };
    getAllParticipantes(data).then((res) => {
      if (res && res.data) {
        setLoading(false);
        setParticipantes(res.data);
      }
      if (res === null) setParticipantes([]);
    });
  };
  function onclickOption(id) {
    if (selectedParticipantId == null) {
      setSelectedParticipantId((prevId) =>
        prevId === id
          ? null
          : participantes.find((participantes) => participantes.id === id)
      );
    } else {
      setSelectedParticipantId(null);
    }
  }
  function onDelete(id) {
    setSelectedParticipantId(id);
    setShowConfirmDialog(true);
  }
  const handleConfirmDelete = () => {
    if (selectedParticipantId) {
      setLoading(true);

      delParticipantes(sessionStorage.token, selectedParticipantId).then(
        (res) => {
          if (res == 1) {
            getAllParticipantes(init).then((nuevalist) => {
              setParticipantes(nuevalist.data);
              setLoading(false);
            });
          }
        }
      );
      setSelectedParticipantId(null);
      setShowConfirmDialog(false);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  function onEditParticipante(participante) {
    document.getElementById("eParticipante").showModal();
  }
  function onEditTraje(participante) {
    document.getElementById("eTraje").showModal();
  }
  function closeForm(form) {
    if (form == "traje") document.getElementById("eTraje").close();
    else document.getElementById("eParticipante").close();
  }
  function exportPDF() {
    setLoading(true);
    const input = document.getElementById("table-to-pdf");
    if (input != null) {
      const btnContainers = document.querySelectorAll(".btn-container");
      btnContainers.forEach((container) => container.classList.add("none"));
     /*  input.classList.add("font-large"); */
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.setFontSize(32);
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        btnContainers.forEach((container) =>
          container.classList.remove("none")
        );
        input.classList.remove("font-large");
        pdf.save("Lista.pdf");
        setLoading(false);
      });
    } else {
      toast.error("no hay datos a imprimir");
      setLoading(false);
    }
  }
  return (
    <>
      <Nav></Nav>

      <form onSubmit={filtrar}>
        <input type="text" placeholder="año" name="año" />
        <select name="rua">
          <option value={""}>---</option>
          <option value={"Rua Summer"}>Rua Summer</option>
          <option value={"Rua Winter"}>Rua Winter</option>
        </select>
        <button type="submit">serch</button>
      </form>

      <button onClick={exportPDF}>Generar PDF</button>
      {loading ? (
        <Loading></Loading>
      ) : participantes.length > 0 ? (
        <div id="table-to-pdf" className="table-container">
          <table className="table-container">
            <tbody>
              <tr className="noborder">
                <td className="noborder">
                  Chicos :{totalPersona.Chicho ? totalPersona.Chicho : "0"}
                </td>
                <td className="noborder">
                  Chicas :{totalPersona.Chica ? totalPersona.Chica : "0"}
                </td>
                <td className="noborder">
                  Niño :{totalPersona.niño ? totalPersona.niño : "0"}
                </td>
                <td className="noborder">
                  Niña :{totalPersona.niña ? totalPersona.niña : "0"}
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Camiseta</th>
                <th>Pantalón</th>
                <th>Fecha de elección</th>
                <th>Traje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {participantes.map((participante) => (
                <tr key={participante.id}>
                  <td>{participante.nombre}</td>
                  <td>{participante.apellido}</td>
                  <td>{participante.dni}</td>
                  <td>{participante.tel}</td>
                  <td>{participante.pecho}</td>
                  <td>{participante.pierna}</td>
                  <td>{participante.fechaTraje}</td>
                  <td>{participante.sexo}</td>
                  <td style={{ position: "relative" }}>
                    <button
                      onClick={() => onclickOption(participante.id)}
                      style={{ marginRight: "10px" }}
                      className="btn-container"
                    >
                      <SlOptionsVertical />
                    </button>
                    {selectedParticipantId &&
                      selectedParticipantId.id === participante.id && (
                        <div className="opciones">
                          <button
                            onClick={() => onEditParticipante({ participante })}
                          >
                            <GiClothes />
                          </button>
                          <button onClick={() => onEditTraje({ participante })}>
                            <FaUserEdit />
                          </button>
                          <button
                            className="btn-container"
                            onClick={() => onDelete(participante.id)}
                          >
                            <BsTrash3 />
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Sin participantes aún</p>
      )}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        message="¿Estás seguro de que quieres eliminar este participante?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <dialog id="eParticipante">
        <button onClick={() => closeForm("p")}>X</button>
        <form>
          <label>Editar Participante</label>
          <input
            onChange={handleChange}
            type="text"
            name="nombre"
            value={formState ? formState.nombre :  selectedParticipantId ? selectedParticipantId.nombre : "No asignado"}
          />
          <input
            onChange={handleChange}
            type="text"
            name="apellido"
            value={formState ? formState.apellido :  selectedParticipantId ? selectedParticipantId.apellido : "No asignado"}
          />
          <input
            onChange={handleChange}
            type="text"
            name="tel"
            value={formState ? formState.tel :  selectedParticipantId ? selectedParticipantId.tel : "No asignado"}
          />
          <input
            onChange={handleChange}
            type="text"
            name="dni"
            value={formState ? formState.dni :  selectedParticipantId ? selectedParticipantId.dni : "No asignado"}
          />

          <button type="submit">Guardar</button>
        </form>
      </dialog>
      <dialog id="eTraje">
        <button onClick={() => closeForm("traje")}>X</button>
        <form>
          <label>
            Editar Traje de{" "}
            { formState ? formState.nombre :  selectedParticipantId ? selectedParticipantId.nombre : "No asignado"}
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="pecho"
            value={formState ? formState.pecho :  selectedParticipantId ? selectedParticipantId.pecho : "No asignado"}
          />
          <input
            onChange={handleChange}
            type="text"
            name="apepierna"
            value={formState ? formState.pierna :  selectedParticipantId ? selectedParticipantId.pierna : "No asignado"}
          />
          <input
            onChange={handleChange}
            type="text"
            name="sexo"
            value={formState ? formState.sexo :  selectedParticipantId ? selectedParticipantId.sexo : "No asignado"}
          />

          <button type="submit">Guardar</button>
        </form>
      </dialog>
    </>
  );
}

export default Participantes;
