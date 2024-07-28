import Home from "../pages/Home";
import Inscripciones from "../pages/Inscripciones";
import Login from "../pages/Login";
import Pagos from "../pages/Pagos";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import Traje from "../pages/Traje";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ins" element={<Inscripciones />} />
          <Route path="/traje" element={<Traje />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
