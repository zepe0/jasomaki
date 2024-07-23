import "./FormInsc.css";

function FormInsc() {
  return (
    <div className="">
      <h1>Inscripciones</h1>
      <form className="FormInsc">
        <input
          className="inputFormIns"
          type="text"
          name="Nombre"
          placeholder="Nombre"
        ></input>

        <input
          className="inputFormIns"
          type="text"
          name="DNI"
          placeholder="DNI"
        ></input>

        <input
          className="inputFormIns"
          type="text"
          name="tel"
          placeholder="Tel"
        ></input>
        <button type="submit">Inscribirme</button>
      </form>
    </div>
  );
}

export default FormInsc;
