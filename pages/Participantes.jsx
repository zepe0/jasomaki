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
  }, [setParticipantes, setLoading, goto, setInit]);
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
  function onEdit(id) {
    console.log(participantes.find((participantes) => participantes.id === id));
    setSelectedParticipantId((prevId) => (prevId === id ? null : id));
  }
  function onDelete(id) {
    setSelectedParticipantId(id);
    setShowConfirmDialog(true);
    setLoading(true);
 /*    delParticipantes(sessionStorage.token, id).then((res) => {
      if (res == 1) {
        getAllParticipantes(init).then((nuevalist) => {
          setParticipantes(nuevalist.data);
        });
      }
    }); */
   
    setLoading(false);

    /* TODO reload list */
  }
  const handleConfirmDelete = () => {
    if (selectedParticipantId) {
      onDelete(selectedParticipantId);
      setShowConfirmDialog(false);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    /* TODO Conectar con back */
  };

  function exportPDF() {
    setLoading(true);
    const input = document.getElementById("table-to-pdf");
    if (input != null) {
      const btnContainers = document.querySelectorAll(".btn-container");
      btnContainers.forEach((container) => container.classList.add("none"));
      input.classList.add("font-large");
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
                      onClick={() => onEdit(participante.id)}
                      style={{ marginRight: "10px" }}
                      className="btn-container"
                    >
                      <SlOptionsVertical />
                    </button>
                    {selectedParticipantId === participante.id && (
                      <div className="opciones">
                        <button
                          onClick={() =>
                            alert(`Opción 1 para ${participante.nombre}`)
                          }
                        >
                         <GiClothes />
                        </button>
                        <button
                          onClick={() =>
                            alert(`Opción 1 para ${participante.nombre}`)
                          }
                        >
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
    </>
  );
}

export default Participantes;
