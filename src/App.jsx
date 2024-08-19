import { Toaster } from "react-hot-toast";
import AdminInscripciones from "../pages/AdminInscripciones";
import AdminTraje from "../pages/AdminTraje";
import Home from "../pages/Home";
import HomeAdmin from "../pages/HomeAdmin";
import Inscripciones from "../pages/Inscripciones";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Pagos from "../pages/Pagos";
import Perfil from "../pages/Perfil";

import Register from "../pages/Register";
import Traje from "../pages/Traje";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeUser from "../pages/Prueva";

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
          <Route path="/Logout" element={<Logout />} />

          {/*  Rutas Admin */}

          <Route path="/Admin" element={<HomeAdmin />} />
          <Route path="/Admin/ins" element={<AdminInscripciones />} />
          <Route path="/Admin/traje" element={<AdminTraje />} />
          <Route path="/Admin/pagos" element={<Pagos />} />

          {/*         Pruevas */}
          <Route path="/prueva" element={<HomeUser />} />
        </Routes>
          <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
